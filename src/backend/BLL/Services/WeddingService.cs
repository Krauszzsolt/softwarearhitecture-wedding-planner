using BLL.DTOs;
using DAL.Data;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class WeddingService : IWeddingService
    {
        private readonly ApplicationDbContext _context;

        public WeddingService(ApplicationDbContext context)
        {
            _context = context;
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

    }
}
