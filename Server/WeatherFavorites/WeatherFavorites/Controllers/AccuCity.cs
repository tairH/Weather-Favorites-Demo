using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeatherFavorites.Api.Controllers
{
    public class AccuCity
    {
        public int Version { get; set; }
        public string Key { get; set; }
        public string Type { get; set; }
        public int Rank { get; set; }
        public string LocalizedName { get; set; }
        public AccuCountry Country { get; set; }
        public AcuuAdministrativeArea AdministrativeArea { get; set; }
    }

    public class AcuuAdministrativeArea
    {
        public string ID { get; set; }
        public string LocalizedName { get; set; }
    }

    public class AccuCountry
    {
        public string ID { get; set; }
        public string LocalizedName { get; set; }
    }
}
