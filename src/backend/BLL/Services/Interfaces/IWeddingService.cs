using BLL.DTOs;
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
    }
}
