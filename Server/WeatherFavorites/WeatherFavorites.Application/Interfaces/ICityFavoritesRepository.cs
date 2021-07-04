
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using WeatherFavorites.Domain;

namespace WeatherFavorites.Application
{
    public interface ICityFavoritesRepository : IGenericRepository<CityFavorite>
    {
    }
}
