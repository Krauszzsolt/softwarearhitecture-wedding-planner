using BLL.DTOs;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IWeddingService
    {
        Task<WeddingDto> GetWedding(long id);

        Task<WeddingDto> AddWedding(WeddingDto newWedding);
    }
}
