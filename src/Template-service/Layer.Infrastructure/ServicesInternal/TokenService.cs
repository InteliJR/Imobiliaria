using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Layer.Domain.Interfaces;
using Newtonsoft.Json;

namespace Layer.Infrastructure.ServicesInternal
{
    public class TokenService : ITokenService
    {
        private readonly HttpClient _httpClient;
        private readonly string _userServiceUrl;

        public TokenService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _userServiceUrl = Environment.GetEnvironmentVariable("UserService__BaseUrl"); ;
        }

        public async Task<string> GenerateTokenAsync(string email, string password)
        {
            var content = new StringContent(JsonConvert.SerializeObject(new { email, senha = password }), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_userServiceUrl}/Account/Login", content);

            if (response.IsSuccessStatusCode)
            {
                var token = await response.Content.ReadAsStringAsync();
                return token;
            }
            else
            {
                throw new Exception("Error generating token");
            }
        }
    }
}
