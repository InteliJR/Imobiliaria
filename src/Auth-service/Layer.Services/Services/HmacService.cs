using Layer.Domain.Interfaces;
using System.Security.Cryptography;
using System.Text;


namespace Layer.Services.Services
{
    // Service para gerenciar o HMAC
    public class HmacService : IHmacService
    {

        // Gera a assinatura HMAC com base no payload e na chave secreta
        public string GenerateHMACSignature(string payload, string secretKey)
        {
            var keyBytes = Convert.FromBase64String(secretKey);
            using var hmac = new HMACSHA256(keyBytes);
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
            return Convert.ToBase64String(hash);
        }

        // Dicionario que guardar as chaves secretas de cada serviço
        private readonly Dictionary<string, string> _serviceSecrets = new Dictionary<string, string>
        {
            { "service_imoveis", Environment.GetEnvironmentVariable("HMAC_KEY") ?? "default-key" },
            { "service_pagamentos", "chave-secreta" }
        }; 

        // Checkar se o nome do cliente é válido
        // Cliente(client-id) é basicamente o nome do serviço que está fazendo a requisição
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

        // Retorna a chave secreta do serviço
        public string GetServiceSecret(string serviceName)
        {
            return _serviceSecrets[serviceName];
        }

    }
}
