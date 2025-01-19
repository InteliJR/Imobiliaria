using Layer.Domain.Interfaces;
using System.Security.Cryptography;
using System.Text;


namespace Layer.Services.Services
{
    public class HmacService : IHmacService
    {
        public string GenerateHMACSignature(string payload, string secretKey)
        {
            var keyBytes = Convert.FromBase64String(secretKey);
            using var hmac = new HMACSHA256(keyBytes);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
            return Convert.ToBase64String(hash);
        }

        private readonly Dictionary<string, string> _serviceSecrets = new Dictionary<string, string>
        {
            { "service_imoveis", Environment.GetEnvironmentVariable("HMAC_KEY") ?? "default-key" },
            { "service_pagamentos", "outra-chave-secreta-em-base64" }
        }; 

        public bool CheckClientName(string clientName)
        {
            Console.WriteLine("ClientName: " + clientName);
            Console.WriteLine("ServiceSecrets: " + string.Join(", ", _serviceSecrets.Select(kv => kv.Key + "=" + kv.Value)));
            if(clientName != "service_imoveis")
            {
                Console.WriteLine("ClientName not found");
            } else{
                Console.WriteLine("ClientName found");
            }

            return _serviceSecrets.ContainsKey(clientName) && !string.IsNullOrEmpty(_serviceSecrets[clientName]);
        }

        public string GetServiceSecret(string serviceName)
        {
            return _serviceSecrets[serviceName];
        }

    }
}
