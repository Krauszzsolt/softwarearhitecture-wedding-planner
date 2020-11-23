using DAL.Entities;
using System;

namespace BLL.DTOs
{
    public class CommentDto
    {
        public CommentDto()
        {

        }

        public CommentDto(Comment _comment)
        {
            Id = _comment.Id;
            TaskId = _comment.TaskId;
            Author = _comment.Author;
            Content = _comment.Content;
            Created = _comment.Created;
        }

        public long Id { get; set; }

        public long TaskId { get; set; }

        public string Author { get; set; }

        public string Content { get; set; }

        public DateTime Created { get; set; }
    }
}
