using System.Threading.Tasks;

namespace Layer.Infrastructure.ServicesInternal
{
    public interface IUsersAPI
    {
        Task<string> SendHMACRequestAsync(string endpoint, object payload);
        Task<string> SendHMACRequestQueryAsync(string endpoint, string userId);
    }
}
