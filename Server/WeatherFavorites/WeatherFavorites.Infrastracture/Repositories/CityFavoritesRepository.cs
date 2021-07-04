using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WeatherFavorites.Application;
using WeatherFavorites.Domain;

namespace WeatherFavorites.Infrastracture
{
    public class CityFavoritesRepository : GenericRepository<CityFavorite>, ICityFavoritesRepository
    {
        private readonly ILogger<CityFavoritesRepository> _logger;
        public CityFavoritesRepository(FavoritesContext context, ILogger<CityFavoritesRepository> logger) : base(context)
        {
            _logger = logger;
        }
       
    }
}
