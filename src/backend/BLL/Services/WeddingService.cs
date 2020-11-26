using BLL.DTOs;
using DAL.Data;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class WeddingService : IWeddingService
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileManager _fileManager;

        public WeddingService(ApplicationDbContext context, IFileManager fileManager)
        {
            _context = context;
            _fileManager = fileManager;
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

            foreach (var item in invite.Guests)
            {
                _w.Guests.Add(new Guest()
                {
                    Name = item.Name,
                    Email = item.Email,
                    AcceptedInvitation = false
                });
            }

            await _context.SaveChangesAsync();

            // send emails

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
