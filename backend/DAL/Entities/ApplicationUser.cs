using Microsoft.AspNetCore.Identity;

namespace DAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public long? WeddingId { get; set; }

        // navigation properties

        public Wedding Wedding { get; set; }

    }
}
