using API.Attributes;
using API.Controllers.Base;
using BLL.DTOs;
using BLL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class TaskController : BaseController
    {

        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        /// <summary>
        /// Get task
        /// </summary>
        /// <param name="id">Task id</param>
        /// <returns>Task data</returns>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<TaskDto>> GetTask(long id)
        {
            throw new NotImplementedException();
            if (id != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }

        /// <summary>
        /// Create a new task
        /// </summary>
        /// <param name="newTask">New task data</param>
        /// <returns>Created task data</returns>
        [HttpPost("add")]
        [Authorize]
        public async Task<ActionResult<TaskDto>> AddTask([FromBody] NewTaskDto newTask)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Delete a task
        /// </summary>
        /// <param name="id">Task id</param>
        /// <returns></returns>
        [HttpPost("{id}/delete")]
        [Authorize]
        public async Task DeleteTask(long id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Complete a task
        /// </summary>
        /// <param name="id">Task id</param>
        /// <returns>Completed task data</returns>
        [HttpPost("{id}/complete")]
        [Authorize]
        public async Task<ActionResult<TaskDto>> CompleteTask(long id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Comment on a task
        /// </summary>
        /// <param name="id">Task id</param>
        /// <returns>Comment</returns>
        [HttpPost("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> CommentTask(long id, NewCommentDto newComment)
        {
            throw new NotImplementedException();
        }
    }
}
