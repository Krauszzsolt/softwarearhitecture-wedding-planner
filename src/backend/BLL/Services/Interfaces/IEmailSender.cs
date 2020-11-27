using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IEmailSender
    {

        Task SendEmailAsync(string address, string subject, string content);

    }
}
