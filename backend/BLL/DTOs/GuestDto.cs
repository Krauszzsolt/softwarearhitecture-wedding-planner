using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs
{
    public class GuestDto
    {
        public long Id { get; set; }

        public long WeddingId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public bool AcceptedInvitation { get; set; }
    }
}
