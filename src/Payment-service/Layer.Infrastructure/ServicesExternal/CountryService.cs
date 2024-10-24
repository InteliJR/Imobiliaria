using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Layer.Infrastructure.ServicesExternal;
using Layer.Application.Models;
using Layer.Domain.Interfaces;


// EXEMPLO SIMPLES DE UMA API EXTERNA (QUE NÃO É NOSSOS MICROSERVIÇOS)

namespace Layer.Infrastructure.ServicesExternal
{
    public class CountryService : ICountryService
    {
        private readonly HttpClient _httpClient;

        public CountryService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CountryApiResponseDTO> GetCountryInfoAsync(string countryName)
        {
            var response = await _httpClient.GetAsync($"https://restcountries.com/v3.1/name/{countryName}");

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            var countryInfo = JsonConvert.DeserializeObject<List<CountryApiResponseDTO>>(content); // Desearlizar o JSON para um objeto
            return countryInfo?.FirstOrDefault(); // Pegsar o primeiro país da lista pq a API retorna uma lista de países
        }
    }
}
