using API.Controllers.Base;
using BLL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class GuestController : BaseController
    {
        private readonly IGuestService _guestService;

        public GuestController(IGuestService guestService)
        {
            _guestService = guestService;
        }

        /// <summary>
        /// Accept invite
        /// </summary>
        /// <param name="id">Guest id</param>
        /// <returns></returns>
        [HttpPost("{id}/accept")]
        public async Task<ActionResult> AcceptInvite(long id)
        {
            await _guestService.AcceptInvite(id);
            return new JsonResult(new { message = "Success" }) { StatusCode = StatusCodes.Status200OK };
        }

        /// <summary>
        /// Decline invite
        /// </summary>
        /// <param name="id">Guest id</param>
        /// <returns></returns>
        [HttpPost("{id}/decline")]
        public async Task<ActionResult> DeclineInvite(long id)
        {
            await _guestService.DeclineInvite(id);
            return new JsonResult(new { message = "Success" }) { StatusCode = StatusCodes.Status200OK };
        }

    }
}
