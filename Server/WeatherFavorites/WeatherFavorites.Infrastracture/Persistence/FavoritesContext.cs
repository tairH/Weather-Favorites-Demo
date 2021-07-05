using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Threading;
using System.Threading.Tasks;
using WeatherFavorites.Domain;

namespace WeatherFavorites.Infrastracture
{
    public class FavoritesContext : DbContext
    {
        public DbSet<CityFavorite> CityFavorite { get; set; }
        public FavoritesContext()
        {

        }

        public FavoritesContext(DbContextOptions<FavoritesContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.EnableSensitiveDataLogging();
        }
    }

    public class BFavoritesContextFactory : IDesignTimeDbContextFactory<FavoritesContext>
    {
        public FavoritesContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<FavoritesContext>();
            optionsBuilder.UseSqlServer("data source=VISDEVSQL01;initial catalog=PortalsWeb;integrated security=True");

            return new FavoritesContext(optionsBuilder.Options);
        }
    }
}
