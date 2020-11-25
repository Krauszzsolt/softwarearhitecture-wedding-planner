using BLL.DTOs;
using DAL.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class TaskGroupService : ITaskGroupService
    {
        private readonly ApplicationDbContext _context;

        public TaskGroupService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TaskGroupDto> GetTaskGroup(long id)
        {
            var result = await _context.TaskGroups.Where(tg => tg.Id == id).Select(tg => new TaskGroupDto()
            {
                Id = tg.Id,
                WeddingId = tg.WeddingId,
                Name = tg.Name,
                Description = tg.Description,
                Completed = tg.Completed,
                CanBeCompleted = !tg.Before.Any(x => !x.Required.Completed),
                RequiredTaskGroups = tg.Before.Select(x => x.RequiredId).ToList(),
                Tasks = tg.Tasks.Select(t => new TaskDto()
                {
                    Id = t.Id,
                    TaskGroupId = t.TaskGroupId,
                    Responsible = t.Responsible,
                    Name = t.Name,
                    Description = t.Description,
                    Completed = t.Completed
                }).ToList()
            }).FirstOrDefaultAsync();
            return result;
        }

    }
}
