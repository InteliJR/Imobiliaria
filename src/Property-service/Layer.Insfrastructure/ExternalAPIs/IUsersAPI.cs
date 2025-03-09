using System.Threading.Tasks;

namespace Layer.Infrastructure.ExternalAPIs
{
    public interface IUsersAPI
    {
        Task<string> SendHMACRequestAsync(string endpoint, object payload);
        Task<string> SendHMACRequestQueryAsync(string endpoint, string userId);
    }
}
