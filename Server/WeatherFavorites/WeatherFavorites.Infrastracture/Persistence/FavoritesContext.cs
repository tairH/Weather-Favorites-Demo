using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using WeatherFavorites.Domain;

namespace WeatherFavorites.Infrastracture
{
    public class FavoritesContext : DbContext
    {
        public DbSet<CityFavorite> CityFavorite { get; set; }

        public FavoritesContext(DbContextOptions<FavoritesContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}
