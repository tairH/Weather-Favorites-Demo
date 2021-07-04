using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherFavorites.Application;
using WeatherFavorites.Domain;

namespace WeatherFavorites.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly ILogger<FavoritesController> _logger;
        private readonly ICityFavoritesRepository _cityFavoritesRepository;
        public FavoritesController(ILogger<FavoritesController> logger, ICityFavoritesRepository cityFavoritesRepository)
        {
            _cityFavoritesRepository = cityFavoritesRepository;
            _logger = logger;
        }

        [HttpGet("GetFavorites")]
        public async Task<List<CityFavorite>> GetAllFavorites()
        {
            return await _cityFavoritesRepository.GetAll();
        }
        [HttpPost("Add")]
        public async Task Add(CityFavorite city)
        {
            await _cityFavoritesRepository.Create(city);
        }
        [HttpPost("Delete")]
        public async Task Delete(int cityKey)
        {
            await _cityFavoritesRepository.Delete(cityKey);
        }


    }
}
