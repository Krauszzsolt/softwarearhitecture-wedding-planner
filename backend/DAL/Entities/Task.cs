using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class Task
    {
        public long Id { get; set; }

        public long TaskGroupId { get; set; }

        public string Name { get; set; }

        public string Responsible { get; set; }

        public string Description { get; set; }

        public bool Completed { get; set; }

        // navigation properties

        public TaskGroup TaskGroup { get; set; }

        public ICollection<Comment> Comments { get; set; }

    }
}
