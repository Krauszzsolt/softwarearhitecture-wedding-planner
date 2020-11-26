using BLL.DTOs;
using DAL.Data;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TaskDto> GetTask(long id)
        {
            var result = await _context.Tasks.Where(t => t.Id == id).Select(t => new TaskDto()
            {
                Id = t.Id,
                TaskGroupId = t.TaskGroupId,
                Responsible = t.Responsible,
                Name = t.Name,
                Description = t.Description,
                Completed = t.Completed,
                Comments = t.Comments.Select(x => new CommentDto()
                {
                    Id = x.Id,
                    TaskId = x.TaskId,
                    Author = x.Author,
                    Content = x.Content,
                    Created = x.Created
                }).ToList()
            }).FirstOrDefaultAsync();
            return result;
        }

        public async Task<TaskDto> AddTask(TaskDto newTask)
        {
            var _t = new DAL.Entities.Task()
            {
                Id = newTask.Id,
                TaskGroupId = newTask.TaskGroupId,
                Responsible = newTask.Responsible,
                Name = newTask.Name,
                Description = newTask.Description,
                Completed = false
            };

            _context.Tasks.Add(_t);

            var _tg = await _context.TaskGroups.FindAsync(_t.TaskGroupId);
            _tg.Completed = false;

            await _context.SaveChangesAsync();

            var result = await _context.Tasks.Where(t => t.Id == _t.Id).Select(t => new TaskDto()
            {
                Id = t.Id,
                TaskGroupId = t.TaskGroupId,
                Responsible = t.Responsible,
                Name = t.Name,
                Description = t.Description,
                Completed = t.Completed
            }).FirstOrDefaultAsync();
            return result;
        }

        public async System.Threading.Tasks.Task DeleteTask(long id)
        {
            var _t = await _context.Tasks.FindAsync(id);

            _context.Tasks.Remove(_t);

            await _context.SaveChangesAsync();

            var _tg = await _context.TaskGroups.Include(x => x.Tasks).Where(tg => tg.Id == _t.TaskGroupId).FirstOrDefaultAsync();
            if (!_tg.Tasks.Any())
            {
                _tg.Completed = false;
            }
            else if (!_tg.Tasks.Any(x => !x.Completed))
            {
                _tg.Completed = true;
            }

            await _context.SaveChangesAsync();
        }

        public async Task<TaskDto> CompleteTask(long id)
        {
            var _t = await _context.Tasks.FindAsync(id);

            _t.Completed = !_t.Completed;

            await _context.SaveChangesAsync();

            var _tg = await _context.TaskGroups.Include(x => x.Tasks).Where(tg => tg.Id == _t.TaskGroupId).FirstOrDefaultAsync();
            _tg.Completed = !_tg.Tasks.Any(x => !x.Completed);
            
            await _context.SaveChangesAsync();

            var result = await _context.Tasks.Where(t => t.Id == _t.Id).Select(t => new TaskDto()
            {
                Id = t.Id,
                TaskGroupId = t.TaskGroupId,
                Responsible = t.Responsible,
                Name = t.Name,
                Description = t.Description,
                Completed = t.Completed
            }).FirstOrDefaultAsync();
            return result;
        }

        public async Task<CommentDto> CommentTask(CommentDto newComment)
        {
            var _c = new Comment()
            {
                TaskId = newComment.TaskId,
                Author = newComment.Author,
                Content = newComment.Content,
                Created = newComment.Created
            };

            _context.Comments.Add(_c);

            await _context.SaveChangesAsync();

            var result = await _context.Comments.FindAsync(_c.Id);
            return new CommentDto(result);
        }
    }
}
