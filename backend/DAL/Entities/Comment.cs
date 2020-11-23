using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class Comment
    {
        public long Id { get; set; }

        public long TaskId { get; set; }

        public string Author { get; set; }

        public string Content { get; set; }

        public DateTime Created { get; set; }

        // navigation properties

        public Task Task { get; set; }

    }
}
