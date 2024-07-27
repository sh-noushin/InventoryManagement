using InventoryManagement.Repositories;
using InventoryManagement.Services;

namespace InventoryManagement.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddRepositoryServices(this IServiceCollection services)
        {
            services.AddSingleton<IItemRepository, ItemRepository>();
            services.AddSingleton(typeof(IRepository<>), typeof(Repository<>));
        }

        public static void AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<IItemService, ItemService>();
        }

        public static void AddCorsServices(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
        }

    }
}
