using System.Collections.Generic;

namespace BLL.DTOs
{
    public class NewTaskDto
    {
        public long TaskGroupId { get; set; }

        public string Name { get; set; }

        public string Responsible { get; set; }

        public string Description { get; set; }

    }
}
