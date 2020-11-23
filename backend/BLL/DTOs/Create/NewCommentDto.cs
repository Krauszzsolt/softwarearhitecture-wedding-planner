using DAL.Entities;
using System;

namespace BLL.DTOs
{
    public class NewCommentDto
    {
        public string Author { get; set; }

        public string Content { get; set; }
    }
}
