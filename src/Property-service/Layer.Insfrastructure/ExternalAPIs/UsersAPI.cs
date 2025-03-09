using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Infrastructure.ExternalAPIs
{
    public class UsersAPI : IUsersAPI
    {   
        // Essas varaiveis estão sendo populadas lá no Program.cs
        private readonly HttpClient _httpClient;
        private readonly string _secretKey; // Chave secreta que tem que estar também no serviço que vai receber a chamada
        private readonly string _clientId; // Client ID que tem que estar também no serviço que vai receber a chamada

        public UsersAPI(HttpClient httpClient, string clientId, string secretKey)
        {
            _httpClient = httpClient;
            _clientId = clientId;
            _secretKey = secretKey;
        }

        // Método para enviar uma requisição post com payload HMAC
        public async Task<string> SendHMACRequestAsync(string endpoint, object payload)
        {
            // Serializa o payload para JSON
            var jsonPayload = System.Text.Json.JsonSerializer.Serialize(payload);

            Console.WriteLine("Payload: " + jsonPayload);

            // Gera o timestamp (para evitar replay attacks)
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

            // Cria o conteúdo para assinar (payload + timestamp)
            var contentToSign = $"{jsonPayload}:{timestamp}";

            Console.WriteLine("Content to sign: " + contentToSign);

            // Gera a assinatura HMAC-SHA256
            var signature = GenerateHMACSignature(contentToSign, _secretKey);

            // Prepara o conteúdo da requisição
            var jsonContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            // Adiciona os cabeçalhos necessários
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("X-Client-Id", _clientId);
            _httpClient.DefaultRequestHeaders.Add("X-Signature", signature);
            _httpClient.DefaultRequestHeaders.Add("X-Timestamp", timestamp);

            // Envia a requisição para o endpoint
            var response = await _httpClient.PostAsync(endpoint, jsonContent);

            // Garante que a resposta foi bem-sucedida
            response.EnsureSuccessStatusCode();

            // Retorna a resposta como string
            return await response.Content.ReadAsStringAsync();
        }

        // Método para enviar uma requisição GET com query HMAC
        public async Task<string> SendHMACRequestQueryAsync(string endpoint, string userId)
        {
            // Gera o timestamp (para evitar replay attacks)
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

            // Cria o conteúdo para assinar (userId + timestamp)
            var contentToSign = $"{userId}:{timestamp}";

            // Gera a assinatura HMAC-SHA256
            var signature = GenerateHMACSignature(contentToSign, _secretKey);

            // Adiciona os cabeçalhos necessários
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("X-Client-Id", _clientId);
            _httpClient.DefaultRequestHeaders.Add("X-Signature", signature);
            _httpClient.DefaultRequestHeaders.Add("X-Timestamp", timestamp);

            // Envia a requisição GET
            var response = await _httpClient.GetAsync(endpoint);

            // Garante que a resposta foi bem-sucedida
            response.EnsureSuccessStatusCode();

            // Retorna a resposta como string
            return await response.Content.ReadAsStringAsync();
        }


        // Método para gerar a assinatura HMAC-SHA256
        private string GenerateHMACSignature(string contentToSign, string secretKey)
        {
            using var hmac = new HMACSHA256(Convert.FromBase64String(secretKey));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(contentToSign));
            return Convert.ToBase64String(hash);
        }
    }
}
