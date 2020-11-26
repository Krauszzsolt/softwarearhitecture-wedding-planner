using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IGuestService
    {
        Task AcceptInvite(long guestId);

        Task DeclineInvite(long guestId);
    }
}
