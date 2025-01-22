using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface IHmacService
    {
        string GenerateHMACSignature(string payload, string secretKey);

        bool CheckClientName(string clientName);

        string GetServiceSecret(string serviceName);
    }

}
