using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherFavorites.Api.Services;
using WeatherFavorites.Api.SettingsObjects;

namespace WeatherFavorites.Api.Controllers
{
    [EnableCors("AllowAllOrigins")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccuWeatherController : ControllerBase
    {
        private readonly AccuWeatherSettings _acuuSettings;

        private readonly IHttpClientService _httpClientService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AccuWeatherController(IOptions<AccuWeatherSettings> acuuSettings,IHttpClientService httpClientService, IHttpContextAccessor httpContextAccessor)
        {
            _acuuSettings = acuuSettings.Value;
            _httpClientService = httpClientService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet("autocomplete/{term}")]
        public async Task<AccuCity[]> AutoCompleteSearch(string term)
        {
            return await _httpClientService.Get<AccuCity[]>
                    ("https://dataservice.accuweather.com", "locations/v1/cities/autocomplete", new Dictionary<string, string>() { { "q", term }, { "apikey", _acuuSettings.ApiKey } });
        }

        [HttpGet("weather/{cityKey}")]
        public async Task<AcuuCurrentCondition[]> GetWeather(string cityKey)
        {
            return await _httpClientService.Get<AcuuCurrentCondition[]>
                    ("https://dataservice.accuweather.com", "currentconditions/v1/"+cityKey, new Dictionary<string, string>() { { "apikey", _acuuSettings.ApiKey } });
        }
    }
}
