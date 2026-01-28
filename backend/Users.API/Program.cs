using Microsoft.EntityFrameworkCore;
using Users.API.Infrastructure;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// EF Core In-Memory
builder.Services.AddDbContext<UsersDbContext>(options =>
    options.UseInMemoryDatabase("UsersDb"));

// MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

var app = builder.Build();

// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// Seed Data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<UsersDbContext>();
    // Add default Admin
    context.Database.EnsureCreated();
    if (!context.Users.Any())
    {
        context.Users.Add(new Users.API.Domain.User("admin", "admin123", "Admin"));
        context.Users.Add(new Users.API.Domain.User("user", "user123", "User"));
        await context.SaveChangesAsync();
    }
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
