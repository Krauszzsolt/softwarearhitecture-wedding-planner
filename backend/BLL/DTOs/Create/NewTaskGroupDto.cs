using System.Collections.Generic;

namespace BLL.DTOs
{
    public class NewTaskGroupDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public List<long> RequiredTaskGroups { get; set; }
    }
}
