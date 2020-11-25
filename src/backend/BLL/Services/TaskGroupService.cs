using BLL.DTOs;
using DAL.Data;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        public async Task<TaskGroupDto> AddTaskGroup(TaskGroupDto newTaskGroup)
        {
            var _tg = new TaskGroup()
            {
                WeddingId = newTaskGroup.WeddingId,
                Name = newTaskGroup.Name,
                Description = newTaskGroup.Description,
                Completed = false,
                Before = newTaskGroup.RequiredTaskGroups.Select(x => new TaskGroupHierarchy() { RequiredId = x }).ToList()
            };

            _context.TaskGroups.Add(_tg);

            await _context.SaveChangesAsync();

            var result = await _context.TaskGroups.Where(tg => tg.Id == _tg.Id).Select(tg => new TaskGroupDto()
            {
                Id = tg.Id,
                WeddingId = tg.WeddingId,
                Name = tg.Name,
                Description = tg.Description,
                Completed = tg.Completed,
                CanBeCompleted = !tg.Before.Any(x => !x.Required.Completed),
                RequiredTaskGroups = tg.Before.Select(x => x.RequiredId).ToList()
            }).FirstOrDefaultAsync();
            return result;
        }

        public async System.Threading.Tasks.Task DeleteTaskGroup(long id)
        {
            var _tg = await _context.TaskGroups.FindAsync(id);

            foreach (var item in await _context.TaskGroupHierarchy.Where(x => x.RequiredId == _tg.Id || x.TaskGroupId == _tg.Id).ToListAsync())
            {
                _context.TaskGroupHierarchy.Remove(item);
            }
            _context.TaskGroups.Remove(_tg);

            await _context.SaveChangesAsync();
        }
    }
}
