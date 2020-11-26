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
        private readonly ITaskGroupService _taskGroupService;

        public TaskController(ITaskService taskService, ITaskGroupService taskGroupService)
        {
            _taskService = taskService;
            _taskGroupService = taskGroupService;
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
            var result = await _taskService.GetTask(id);
            var _tg = await _taskGroupService.GetTaskGroup(result.TaskGroupId);
            if (_tg.WeddingId != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return result;
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
            var _tg = await _taskGroupService.GetTaskGroup(newTask.TaskGroupId);
            if (_tg == null)
            {
                return NotFound();
            }
            if (_tg.WeddingId != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }

            return await _taskService.AddTask(new TaskDto()
            {
                TaskGroupId = _tg.Id,
                Name = newTask.Name,
                Description = newTask.Description,
                Responsible = newTask.Responsible
            });
        }

        /// <summary>
        /// Delete a task
        /// </summary>
        /// <param name="id">Task id</param>
        /// <returns></returns>
        [HttpPost("{id}/delete")]
        [Authorize]
        public async Task<ActionResult> DeleteTask(long id)
        {
            var _t = await _taskService.GetTask(id);
            var _tg = await _taskGroupService.GetTaskGroup(_t.TaskGroupId);
            if (_tg.WeddingId != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            await _taskService.DeleteTask(id);
            return new JsonResult(new { message = "Success" }) { StatusCode = StatusCodes.Status200OK };
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
            var _t = await _taskService.GetTask(id);
            var _tg = await _taskGroupService.GetTaskGroup(_t.TaskGroupId);
            if (_tg.WeddingId != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return await _taskService.CompleteTask(id);
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
            var _t = await _taskService.GetTask(id);
            var _tg = await _taskGroupService.GetTaskGroup(_t.TaskGroupId);
            if (_tg.WeddingId != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return await _taskService.CommentTask(new CommentDto()
            {
                TaskId = id,
                Author = newComment.Author,
                Content = newComment.Content,
                Created = DateTime.Now
            });
        }
    }
}
