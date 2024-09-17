using Microsoft.OpenApi.Models;
using Layer.Domain.Interfaces;
using Layer.Services;
using Layer.Services.Services;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Carregar variáveis de ambiente do arquivo .env
Env.Load();

// Sobrepor os valores das variáveis no appsettings.json com as variáveis do ambiente
builder.Configuration.AddEnvironmentVariables();

// !!!!! Injenções de dependência !!!!!

// Vamos usar o AddSingleton usar a msm instância em usada em toda a aplicação
// Se usamos o AddScoped, ele cria uma instância por requisição aí ele vai zerar a lista de mensagens a cada requisição
builder.Services.AddSingleton<IMessageService, MessageService>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();


// Registrar o dbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configura o Swagger com o JWT
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Serviço de Gerenciamento de usuários API", Version = "v1" });

    // Configura��o para exibir a op��o de autentica��o Bearer
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter JWT with Bearer into field",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
    {
        new OpenApiSecurityScheme {
            Reference = new OpenApiReference {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        },
        new string[] { }
    }});
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Serviço de gestão de usuários");
        c.RoutePrefix = string.Empty; // Para carregar o Swagger na raiz (http://localhost:<port>/)
    });
}else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
