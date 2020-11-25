using BLL.DTOs;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface ITaskGroupService
    {
        public Task<TaskGroupDto> GetTaskGroup(long id);
    }
}
