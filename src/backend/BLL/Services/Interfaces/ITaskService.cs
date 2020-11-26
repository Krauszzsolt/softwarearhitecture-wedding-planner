using BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface ITaskService
    {
        Task<TaskDto> GetTask(long id);

        Task<TaskDto> AddTask(TaskDto newTask);

        Task DeleteTask(long id);

        Task<TaskDto> CompleteTask(long id);

        Task<CommentDto> CommentTask(CommentDto newComment);
    }
}
