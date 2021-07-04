using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeatherFavorites.Application;

namespace WeatherFavorites.Infrastracture
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<FavoritesContext>(options => options.UseSqlServer(configuration.GetConnectionString("FavoritesDB")));
            services.AddScoped<ICityFavoritesRepository, CityFavoritesRepository>();
            return services;
        }
    }
}
