namespace DAL.Entities
{
    public class Guest
    {
        public long Id { get; set; }

        public long WeddingId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public bool AcceptedInvitation { get; set; }

        // navigation properties

        public Wedding Wedding { get; set; }

    }
}
