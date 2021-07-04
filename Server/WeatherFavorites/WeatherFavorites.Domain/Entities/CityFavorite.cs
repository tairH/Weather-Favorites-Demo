using System;

namespace WeatherFavorites.Domain
{
    public class CityFavorite
    {
        public int CityKey { get; set; }

        public string CityLocalizedName { get; set; }
        
        public int CountryLocalizedName { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
