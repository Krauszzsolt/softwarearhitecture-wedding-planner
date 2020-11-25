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
    public class TaskGroupController : BaseController
    {

        private readonly ITaskGroupService _taskGroupService;

        public TaskGroupController(ITaskGroupService taskGroupService)
        {
            _taskGroupService = taskGroupService;
        }

        /// <summary>
        /// Get task group
        /// </summary>
        /// <param name="id">Task group id</param>
        /// <returns>Task group data</returns>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<TaskGroupDto>> GetTaskGroup(long id)
        {
            var result = await _taskGroupService.GetTaskGroup(id);
            if (result.WeddingId != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return result;
        }

        /// <summary>
        /// Create a new task group
        /// </summary>
        /// <param name="newTaskGroup">New task group data</param>
        /// <returns>Created task group data</returns>
        [HttpPost("add")]
        [Authorize]
        public async Task<ActionResult<TaskGroupDto>> AddTaskGroup([FromBody] NewTaskGroupDto newTaskGroup)
        {
            return await _taskGroupService.AddTaskGroup(new TaskGroupDto()
            {
                WeddingId = CurrentUser.WeddingId.Value,
                Name = newTaskGroup.Name,
                Description = newTaskGroup.Description,
                RequiredTaskGroups = newTaskGroup.RequiredTaskGroups
            });
        }

        /// <summary>
        /// Delete a task group
        /// </summary>
        /// <param name="id">Task group id</param>
        /// <returns></returns>
        [HttpPost("{id}/delete")]
        [Authorize]
        public async Task<ActionResult> DeleteTaskGroup(long id)
        {
            var _tg = await _taskGroupService.GetTaskGroup(id);
            if (_tg.WeddingId != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            await _taskGroupService.DeleteTaskGroup(id);
            return new JsonResult(new { message = "Success" }) { StatusCode = StatusCodes.Status200OK };
        }
    }
}
