using System;
using System.ComponentModel.DataAnnotations;

namespace WeatherFavorites.Domain
{
    public class CityFavorite
    {
        [Key]
       public string CityKey { get; set; }

        public string CityLocalizedName { get; set; }
        
        public string CountryLocalizedName { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
