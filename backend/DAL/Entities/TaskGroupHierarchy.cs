using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class TaskGroupHierarchy
    {
        public long Id { get; set; }

        public long TaskGroupId { get; set; }

        public long RequiredId { get; set; }

        // navigation properties

        public TaskGroup TaskGroup { get; set; }

        public TaskGroup Required { get; set; }

    }
}
