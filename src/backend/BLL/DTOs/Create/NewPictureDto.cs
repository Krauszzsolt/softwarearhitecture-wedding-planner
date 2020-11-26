using Microsoft.AspNetCore.Http;

namespace BLL.DTOs
{
    public class NewPictureDto
    {
        public IFormFile File { get; set; }
    }
}
