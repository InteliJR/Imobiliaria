using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateTokenAsync(string email, string password);
    }
}
