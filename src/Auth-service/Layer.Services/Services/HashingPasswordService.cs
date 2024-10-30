using Layer.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace Layer.Services.Services
{
    public class HashingPasswordService : IHashingPasswordService
    {
        private const int workfactor = 14; // Custo de trabalho para o Bcrypto gerar o hash

        public Task<string> HashPassword(string password)
        {
            return Task.FromResult(BCrypt.Net.BCrypt.HashPassword(password, workfactor));
        }

        public Task<bool> VerifyPassword(string password, string HashedPassword)
        {
            return Task.FromResult(BCrypt.Net.BCrypt.Verify(password, HashedPassword));
        }

    }
}
