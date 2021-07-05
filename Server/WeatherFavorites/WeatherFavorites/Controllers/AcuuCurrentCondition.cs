using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeatherFavorites.Api.Controllers
{
    public class AcuuCurrentCondition
    {
        public string WeatherText { get; set; }
        public AccuLocalSource LocalSource { get; set; }

        public AccuTemperature Temperature { get; set; }
    }

    public class AccuLocalSource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string WeatherCode { get; set; }
    }

    public class AccuTemperature
    {
        public AcuuMetric Metric { get; set; }
    }

    public class AcuuMetric
    {
        public Double Value { get; set; }
        public string Unit { get; set; }
        public int UnitType { get; set; }
    }
}
