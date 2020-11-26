using BLL.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IWeddingService
    {
        Task<WeddingDto> GetWedding(long id);

        Task<WeddingDto> AddWedding(WeddingDto newWedding);

        Task<List<GuestDto>> GetInvitedGuests(long id);

        Task InviteGuests(long weddingId, InviteDto invite);

        Task<ActionResult<string>> AddPicture(long weddingId, IFormFile picture);

        Task<ActionResult<List<string>>> GetPictures(long weddingId);
    }
}
