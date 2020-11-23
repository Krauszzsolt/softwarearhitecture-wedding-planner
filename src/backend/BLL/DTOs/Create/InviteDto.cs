using System.Collections.Generic;

namespace BLL.DTOs
{
    public class InviteDto
    {
        public string InvitationText { get; set; }

        public List<NewGuestDto> Guests { get; set; }
    }
}
