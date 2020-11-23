using System.Collections.Generic;

namespace BLL.DTOs
{
    public class TaskDto
    {
        public long Id { get; set; }

        public long TaskGroupId { get; set; }

        public string Name { get; set; }

        public string Responsible { get; set; }

        public string Description { get; set; }

        public bool Completed { get; set; }

        public List<CommentDto> Comments { get; set; }

    }
}
