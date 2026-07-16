var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Medicine Tracker API",
        Version = "v1",
        Description = "Stores medicines and sale records in a JSON file on the server."
    });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientApp", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});
builder.Services.AddSingleton<api.Services.IMedicineRepository, api.Services.JsonMedicineRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ClientApp");

app.MapControllers();

app.Run();
