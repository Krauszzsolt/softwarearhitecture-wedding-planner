using BLL.DTOs;
using BLL.DTOs.Settings;
using DAL.Data;
using DAL.Entities;
using Ganss.XSS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class WeddingService : IWeddingService
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileManager _fileManager;
        private readonly IEmailSender _emailSender;
        private readonly FrontendSettings _frontendSettings;

        public WeddingService(ApplicationDbContext context, IFileManager fileManager, IEmailSender emailSender, IOptions<FrontendSettings> frontendSettings)
        {
            _context = context;
            _fileManager = fileManager;
            _emailSender = emailSender;
            _frontendSettings = frontendSettings.Value;
        }

        public async Task<WeddingDto> GetWedding(long id)
        {
            var result = await _context.Weddings.Where(w => w.Id == id).Select(w => new WeddingDto() 
            {
                Id = w.Id,
                UserId = w.UserId,
                Name = w.Name,
                BethrothedOne = w.BethrothedOne,
                BethrothedTwo = w.BethrothedTwo,
                Date = w.Date,
                TaskGroups = w.TaskGroups.Select(tg => new TaskGroupDto()
                {
                    Id = tg.Id,
                    WeddingId = tg.WeddingId,
                    Name = tg.Name,
                    Description = tg.Description,
                    Completed = tg.Completed,
                    CanBeCompleted = !tg.Before.Any(x => !x.Required.Completed),
                    RequiredTaskGroups = tg.Before.Select(x => x.RequiredId).ToList()
                }).ToList()
            }).FirstOrDefaultAsync();
            return result;
        }

        public async Task<WeddingDto> AddWedding(WeddingDto newWedding)
        {
            var _w = new Wedding()
            {
                UserId = newWedding.UserId,
                Name = newWedding.Name,
                BethrothedOne = newWedding.BethrothedOne,
                BethrothedTwo = newWedding.BethrothedTwo,
                Date = newWedding.Date
            };

            _context.Weddings.Add(_w);

            var _u = await _context.Users.FindAsync(newWedding.UserId);
            _u.Wedding = _w;

            await _context.SaveChangesAsync();

            var result = await _context.Weddings.FindAsync(_w.Id);
            return new WeddingDto(result);
        }

        public async Task<List<GuestDto>> GetInvitedGuests(long id)
        {
            return await _context.Guests.Where(g => g.WeddingId == id).Select(g => new GuestDto()
            {
                Id = g.Id,
                WeddingId = g.WeddingId,
                Name = g.Name,
                AcceptedInvitation = g.AcceptedInvitation,
                Email = g.Email
            }).ToListAsync();
        }

        public async System.Threading.Tasks.Task InviteGuests(long weddingId, InviteDto invite)
        {
            var _w = await _context.Weddings.Include(x => x.Guests).Where(w => w.Id == weddingId).FirstOrDefaultAsync();
            var newGuests = new List<Guest>();

            foreach (var item in invite.Guests)
            {
                var _g = new Guest()
                {
                    Name = item.Name,
                    Email = item.Email,
                    AcceptedInvitation = false
                };
                _w.Guests.Add(_g);
                
                newGuests.Add(_g);
            }

            await _context.SaveChangesAsync();
            
            // send emails
            var sanitizer = new HtmlSanitizer();
            var invitationText = sanitizer.Sanitize(invite.InvitationText);

            foreach (var item in newGuests)
            {
                var invitation = $"<p>{invitationText}</p><a href=\"{_frontendSettings.BaseUrl}/{_frontendSettings.InvitationRoute}/{item.Id} \">Meghívó</a>";
                await _emailSender.SendEmailAsync(item.Email, "Meghívó", invitation);
            }
        }

        public async Task<ActionResult<string>> AddPicture(long weddingId, IFormFile picture)
        {
            var imagesDir = "images";
            var fileName = await _fileManager.SaveFile(picture, imagesDir);

            var _p = new Picture()
            {
                WeddingId = weddingId,
                PictureFile = $"/{imagesDir}/{fileName}"
            };

            _context.Pictures.Add(_p);

            await _context.SaveChangesAsync();

            return _p.PictureFile;
        }

        public async Task<ActionResult<List<string>>> GetPictures(long weddingId)
        {
            return await _context.Pictures.Where(p => p.WeddingId == weddingId).Select(x => x.PictureFile).ToListAsync();
        }
    }
}
