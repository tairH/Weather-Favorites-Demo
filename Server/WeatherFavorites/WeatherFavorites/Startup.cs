using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NLog.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherFavorites.Api.SettingsObjects;
using WeatherFavorites.Infrastracture;

namespace WeatherFavorites
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, Microsoft.AspNetCore.Hosting.IWebHostEnvironment env)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddInfrastructureServices(Configuration);

            services.AddControllers();
            if (Convert.ToBoolean(Configuration.GetSection("Swagger").GetSection("EnableSwagger").Value) == true)
            {
                services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "MOH.TimnaResearch.Api", Version = "v1" }));
            }
            services.Configure<AccuWeatherSettings>(Configuration.GetSection("SearchSettings"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
                endpoints.MapControllers();
            });
            if (Convert.ToBoolean(Configuration.GetSection("Swagger").GetSection("EnableSwagger").Value) == true)
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MOH.TimnaResearch.Api"));
            }
            NLogBuilder.ConfigureNLog("nlog.config");

            Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .UseNLog();
        }
    }
}
