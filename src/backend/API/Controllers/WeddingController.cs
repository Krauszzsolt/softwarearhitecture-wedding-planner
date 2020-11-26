using API.Attributes;
using API.Controllers.Base;
using BLL.DTOs;
using BLL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class WeddingController : BaseController
    {

        private readonly IWeddingService _weddingService;

        public WeddingController(IWeddingService weddingService)
        {
            _weddingService = weddingService;
        }

        /// <summary>
        /// Get wedding
        /// </summary>
        /// <param name="id">Wedding id</param>
        /// <returns>Wedding data</returns>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<WeddingDto>> GetWedding(long id)
        {
            if (id != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return await _weddingService.GetWedding(id);
        }

        /// <summary>
        /// Create a new wedding
        /// </summary>
        /// <param name="newWedding">New wedding data</param>
        /// <returns>Created wedding data</returns>
        [HttpPost("add")]
        [Authorize]
        public async Task<ActionResult<WeddingDto>> AddWedding([FromBody] NewWeddingDto newWedding)
        {
            return await _weddingService.AddWedding(new WeddingDto()
            {
                UserId = CurrentUser.Id,
                Name = newWedding.Name,
                BethrothedOne = newWedding.BethrothedOne,
                BethrothedTwo = newWedding.BethrothedTwo,
                Date = newWedding.Date
            });
        }

        /// <summary>
        /// Add new picture
        /// </summary>
        /// <param name="picture">New picture</param>
        /// <returns>Picture id</returns>
        [HttpPost("{id}/upload")]
        [Authorize]
        public async Task<ActionResult<string>> AddPicture(long id, [FromForm] NewPictureDto picture)
        {
            if (id != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return await _weddingService.AddPicture(id, picture.File);
        }

        /// <summary>
        /// Get all pictures for wedding
        /// </summary>
        /// <param name="id">Wedding id</param>
        /// <returns>Picture urls</returns>
        [HttpGet("{id}/pictures")]
        [Authorize]
        public async Task<ActionResult<List<string>>> GetPictures(long id)
        {
            if (id != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return await _weddingService.GetPictures(id);
        }

        /// <summary>
        /// Get invited guests
        /// </summary>
        /// <param name="id">Wedding id</param>
        /// <returns>Invited guests</returns>
        [HttpGet("{id}/invited")]
        [Authorize]
        public async Task<ActionResult<List<GuestDto>>> GetInvitedGuests(long id)
        {
            if (id != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            return await _weddingService.GetInvitedGuests(id);
        }

        /// <summary>
        /// Invite guests
        /// </summary>
        /// <param name="id">Wedding id</param>
        /// <param name="invite">Invite information</param>
        /// <returns></returns>
        [HttpPost("{id}/invite")]
        [Authorize]
        public async Task<ActionResult> InviteGuests(long id, [FromBody] InviteDto invite)
        {
            if (id != CurrentUser.WeddingId)
            {
                return new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
            await _weddingService.InviteGuests(id, invite);
            return new JsonResult(new { message = "Success" }) { StatusCode = StatusCodes.Status200OK };
        }
    }
}
