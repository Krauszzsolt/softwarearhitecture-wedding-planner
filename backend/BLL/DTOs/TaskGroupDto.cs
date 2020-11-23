using System.Collections.Generic;

namespace BLL.DTOs
{
    public class TaskGroupDto
    {
        public long Id { get; set; }

        public long WeddingId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool Completed { get; set; }

        public List<TaskDto> Tasks { get; set; }

        // computed

        public bool CanBeCompleted { get; set; }

        public List<long> RequiredTaskGroups { get; set; }
    }
}
