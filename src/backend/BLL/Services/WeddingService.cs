using BLL.DTOs;
using DAL.Data;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
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
    }
}
