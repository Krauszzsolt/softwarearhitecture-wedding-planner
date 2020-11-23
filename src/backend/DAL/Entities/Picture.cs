namespace DAL.Entities
{
    public class Picture
    {
        public long Id { get; set; }

        public long WeddingId { get; set; }

        public string PictureFile { get; set; }

        // navigation properties

        public Wedding Wedding { get; set; }

    }
}
