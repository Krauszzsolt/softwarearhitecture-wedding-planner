using DAL.Data;
using System;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class GuestService : IGuestService
    {
        private readonly ApplicationDbContext _context;

        public GuestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AcceptInvite(long guestId)
        {
            var _g = await  _context.Guests.FindAsync(guestId);

            _g.AcceptedInvitation = true;

            await _context.SaveChangesAsync();
        }

        public async Task DeclineInvite(long guestId)
        {
            var _g = await _context.Guests.FindAsync(guestId);

            _g.AcceptedInvitation = false;
            
            await _context.SaveChangesAsync();
        }
    }
}
