using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace LFF.API
{
  public class Program
  {
    public static void Main(string[] args)
    {
      AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

      CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
