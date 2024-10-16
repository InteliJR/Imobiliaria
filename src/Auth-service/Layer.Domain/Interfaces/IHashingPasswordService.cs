using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface IHashingPasswordService
    {
        Task<string> HashPassword(string password);

        Task<bool> VerifyPassword(string password, string HashedPassword);
    }
}
