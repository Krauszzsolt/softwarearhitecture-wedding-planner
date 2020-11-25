using BLL.DTOs;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface ITaskGroupService
    {
        Task<TaskGroupDto> GetTaskGroup(long id);
        
        Task<TaskGroupDto> AddTaskGroup(TaskGroupDto taskGroupDto);
        
        Task DeleteTaskGroup(long id);
    }
}
