using Layer.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Layer.Domain.Interfaces
{
    public interface ICountryService
    {
        Task<CountryApiResponseDTO> GetCountryInfoAsync(string countryName);
    }
}
