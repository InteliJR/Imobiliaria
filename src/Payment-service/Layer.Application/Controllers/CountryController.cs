using Microsoft.AspNetCore.Mvc;
using Layer.Domain.Interfaces;

namespace Layer.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : Controller
    {
        private readonly ICountryService _countryService;

        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet("CountrInfomartion")]
        public async Task<IActionResult> GetCountryInfo(string countryName)
        {
            var country = await _countryService.GetCountryInfoAsync(countryName);
            if (country == null)
            {
                return NotFound("Country not found.");
            }

            return Ok(country);
        }
    }

}
