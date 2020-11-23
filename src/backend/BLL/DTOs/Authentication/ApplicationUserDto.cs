using DAL.Entities;

namespace BLL.DTOs.Authentication
{
    public class ApplicationUserDto
    {
        // default constructor for JSON parse
        public ApplicationUserDto()
        {

        }

        public ApplicationUserDto(ApplicationUser applicationUser)
        {
            Id = applicationUser.Id;
            UserName = applicationUser.UserName;
            WeddingId = applicationUser.WeddingId;
        }

        public string Id { get; set; }

        public string UserName { get; set; }

        public long? WeddingId { get; set; }

        public string Token { get; set; }

    }
}
