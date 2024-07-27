using InventoryManagement.Data;
using InventoryManagement.Extensions;
using InventoryManagement.Repositories;
using InventoryManagement.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCorsServices();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<AppDbContext>(provider =>
{
    var options = new DbContextOptionsBuilder<AppDbContext>()
        .UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        .Options;
    return new AppDbContext(options);
});

builder.Services.AddRepositoryServices();
builder.Services.AddBusinessServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
