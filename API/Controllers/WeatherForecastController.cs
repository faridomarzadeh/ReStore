using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string [] summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {

        var forecast =  Enumerable.Range(1, 5).Select(index =>
            new WeatherForecast
            (
                 DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                 Random.Shared.Next(-20, 55),
                 summaries[Random.Shared.Next(summaries.Length)]
             )).ToArray();
             
             return forecast;
        }
        
    }
}
