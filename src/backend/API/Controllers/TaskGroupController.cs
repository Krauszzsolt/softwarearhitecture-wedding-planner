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
            throw new NotImplementedException();
            if (id != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
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
            throw new NotImplementedException();
        }

        /// <summary>
        /// Delete a task group
        /// </summary>
        /// <param name="id">Task group id</param>
        /// <returns></returns>
        [HttpPost("{id}/delete")]
        [Authorize]
        public async Task DeleteTaskGroup(long id)
        {
            throw new NotImplementedException();
        }
    }
}
