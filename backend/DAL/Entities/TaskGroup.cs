using System.Collections.Generic;

namespace DAL.Entities
{
    public class TaskGroup
    {
        public long Id { get; set; }

        public long WeddingId { get; set; }

        public string Name { get; set; }

        public bool Completed { get; set; }

        // navigation properties

        public Wedding Wedding { get; set; }

        public ICollection<Task> Tasks { get; set; }

        public ICollection<TaskGroupHierarchy> Before { get; set; }

        public ICollection<TaskGroupHierarchy> After { get; set; }

    }
}
