﻿using API.Attributes;
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
            throw new NotImplementedException();
        }

        /// <summary>
        /// Create a new wedding
        /// </summary>
        /// <param name="newWeding">New wedding data</param>
        /// <returns>Created wedding data</returns>
        [HttpPost("add")]
        [Authorize]
        public async Task<ActionResult<WeddingDto>> AddWedding([FromBody] NewWeddingDto newWeding)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Add new picture
        /// </summary>
        /// <param name="picture">New picture</param>
        /// <returns>Picture id</returns>
        [HttpPost("{id}/upload")]
        [Authorize]
        public async Task<ActionResult<string>> AddPicture(long id, [FromForm] IFormFile picture)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        /// <summary>
        /// Invite guests
        /// </summary>
        /// <param name="id">Wedding id</param>
        /// <param name="invite">Invite information</param>
        /// <returns></returns>
        [HttpPost("{id}/invite")]
        [Authorize]
        public async Task InviteGuests(long id, [FromBody] InviteDto invite)
        {
            throw new NotImplementedException();
        }
    }
}
