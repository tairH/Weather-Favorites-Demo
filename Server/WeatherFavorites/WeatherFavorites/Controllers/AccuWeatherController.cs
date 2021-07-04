using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherFavorites.Api.Services;
using WeatherFavorites.Api.SettingsObjects;

namespace WeatherFavorites.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccuWeatherController : ControllerBase
    {
        private readonly AccuWeatherSettings _acuuSettings;

        private readonly IHttpClientService _httpClientService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AccuWeatherController(AccuWeatherSettings acuuSettings,IHttpClientService httpClientService, IHttpContextAccessor httpContextAccessor)
        {
            _acuuSettings = acuuSettings;
            _httpClientService = httpClientService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet("autocomplete/{term}")]
        public async Task<Object[]> AutoCompleteSearch(string term)
        {
            return await _httpClientService.Get<Object[]>
                    ("https://dataservice.accuweather.com", "locations/v1/cities/autocomplete", new Dictionary<string, string>() { { "q", term }, { "apiKey", _acuuSettings.ApiKey } });
        }

        [HttpGet("weather/{cityKey}")]
        public async Task<Object> GetWeather(string cityKey)
        {
            return await _httpClientService.Get<Object>
                    ("https://dataservice.accuweather.com", "currentconditions/v1/"+cityKey, new Dictionary<string, string>() { { "apiKey", _acuuSettings.ApiKey } });
        }
    }
}
