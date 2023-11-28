using IGeekFan.AspNetCore.RapiDoc;
using LFF.API.Helpers;
using LFF.API.Helpers.Authorization.Middleware;
using LFF.API.Middleware;
using LFF.BackgroundServices.AutoSubmit;
using LFF.Core.Extensions;
using LFF.Infrastructure.EF.Extensions;
using LFF.Infrastructure.EF.Utils.PasswordUtils;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace LFF.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddControllers();
            services.RegisterEFDatabase(this.Configuration);
            services.RegisterRepositories(this.Configuration);
            services.RegisterServices(this.Configuration);

            services.Configure<AppSettings>(options => 
            {
                options.Audience = Environment.GetEnvironmentVariable("APP_AUDIENCE") ?? "";
                options.Issuer = Environment.GetEnvironmentVariable("APP_ISSUER") ?? "";
                options.Secret = Environment.GetEnvironmentVariable("APP_SECRET") ?? "";
            });

            services.Configure<PasswordSettings>(options =>
            {
                options.Algorithm = Environment.GetEnvironmentVariable("PASSWORD_ALGORITHM") ?? "";
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddHostedService<AutoSubmitService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware<GlobalExceptionMiddleware>();

            app.UseCors(builder => builder 
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
