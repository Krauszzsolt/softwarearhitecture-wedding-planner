using System;
using System.Collections.Generic;

namespace DAL.Entities
{
    public class Wedding
    {
        public long Id { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        public string BethrothedOne { get; set; }
        
        public string BethrothedTwo { get; set; }

        public DateTime Date { get; set; }

        // navigation properties

        public ApplicationUser User { get; set; }

        public ICollection<Guest> Guests { get; set; }

        public ICollection<Picture> Pictures { get; set; }

        public ICollection<TaskGroup> TaskGroups { get; set; }

    }
}
