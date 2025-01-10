using Microsoft.OpenApi.Models;
using Layer.Domain.Interfaces;
using Layer.Services;
using Layer.Services.Services;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Layer.Domain.Entities;
using Layer.Domain.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Hangfire;
using Hangfire.PostgreSql;
using System.Text;
using MongoDB.Driver;


var builder = WebApplication.CreateBuilder(args);

// Carregar variáveis de ambiente do arquivo .env
var env = builder.Environment.EnvironmentName;

if (env == "Development")
{
    Env.Load(".env.development");
}
else if (env == "Production")
{
    Env.Load("etc/secrets/.env.production");
}
else
{
    Env.Load();  // Caso você tenha um `.env` padrão
}


// Sobrepor os valores das variáveis no appsettings.json com as variáveis do ambiente
builder.Configuration.AddEnvironmentVariables();


/*Console.WriteLine("Variáveis de ambiente:");
Console.WriteLine($"Connection string: {builder.Configuration.GetConnectionString("DefaultConnection")}");
Console.WriteLine($"JwtSettings__SecretKey: {Environment.GetEnvironmentVariable("JwtSettings__SecretKey")}");
Console.WriteLine($"JwtSettings__ExpiryMinutes: {Environment.GetEnvironmentVariable("JwtSettings__ExpiryMinutes")}");
Console.WriteLine($"JwtSettings__Issuer: {Environment.GetEnvironmentVariable("JwtSettings__Issuer")}");
Console.WriteLine($"JwtSettings__Audience: {Environment.GetEnvironmentVariable("JwtSettings__Audience")}");*/

// Configuração do Mongo

var mongoSettings = new MongoDbSettings
{
    ConnectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING"),
    DatabaseName = Environment.GetEnvironmentVariable("MONGO_DATABASE_NAME"),
    LogsCollectionName = Environment.GetEnvironmentVariable("MONGO_LOGS_COLLECTION_NAME") ?? "Logs"
};

builder.Services.AddSingleton(mongoSettings);
builder.Services.AddSingleton<IMongoClient>(sp => new MongoClient(mongoSettings.ConnectionString));
; // Aqui a gnt tá criando um singleton do mongo client para usar em toda a aplicação 

// !!!!! Injenções de dependência !!!!!

// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions =>
        {
            npgsqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorCodesToAdd: null);
            npgsqlOptions.CommandTimeout(30); // Timeout de 30 segundos
        })
    .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking) // Desabilitar rastreamento de mudanças para melhorar a performance
);

// Configurar HangFire

builder.Services.AddHangfire(config =>
{
    config.UsePostgreSqlStorage(builder.Configuration.GetConnectionString("DefaultConnection"), new Hangfire.PostgreSql.PostgreSqlStorageOptions
    {
        InvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.FromSeconds(15),
        DistributedLockTimeout = TimeSpan.FromMinutes(10),
    });
});

builder.Services.AddHangfireServer();

/*builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
*/
// Vamos usar o AddSingleton usar a msm instância em usada em toda a aplicação
// Se usamos o AddScoped, ele cria uma instância por requisição aí ele vai zerar a lista de mensagens a cada requisição
builder.Services.AddScoped<IMessageService, MessageService>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ILocadorService, LocadorService>();
builder.Services.AddScoped<ILocatarioService, LocatarioService>();
builder.Services.AddScoped<IColaboradorService, ColaboradorService>();
builder.Services.AddScoped<IEmailSender, EmailSenderService>();
builder.Services.AddScoped<IHashingPasswordService, HashingPasswordService>();
builder.Services.AddScoped<ApplicationLog>();

// Configura JWT settings
var jwtSettings = new JwtSettings
{
    SecretKey = Environment.GetEnvironmentVariable("JwtSettings__SecretKey"),
    ExpiryMinutes = int.Parse(Environment.GetEnvironmentVariable("JwtSettings__ExpiryMinutes")),
    Issuer = Environment.GetEnvironmentVariable("JwtSettings__Issuer"),
    Audience = Environment.GetEnvironmentVariable("JwtSettings__Audience")
};
builder.Services.AddSingleton(jwtSettings);

// Configura autenticação JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
    };
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();



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

// Configurar roles para o JWT

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(nameof(Roles.Admin), policy => policy.RequireRole(nameof(Roles.Admin)));
    options.AddPolicy(nameof(Roles.Locador), policy => policy.RequireRole(nameof(Roles.Locador)));
    options.AddPolicy(nameof(Roles.Locatario), policy => policy.RequireRole(nameof(Roles.Locatario)));
    options.AddPolicy(nameof(Roles.Judiciario), policy => policy.RequireRole(nameof(Roles.Judiciario)));
    options.AddPolicy("AllRoles", policy => policy.RequireRole(nameof(Roles.Admin), nameof(Roles.Locador), nameof(Roles.Locatario), nameof(Roles.Judiciario)));
    options.AddPolicy("LocadorORLocatario", policy => policy.RequireRole(nameof(Roles.Locador), nameof(Roles.Locatario)));
    options.AddPolicy("AdminORJudiciario", policy => policy.RequireRole(nameof(Roles.Admin), nameof(Roles.Judiciario)));
    options.AddPolicy("AdminORLocador", policy => policy.RequireRole(nameof(Roles.Admin), nameof(Roles.Locador)));
    options.AddPolicy("AdminORLocatario", policy => policy.RequireRole(nameof(Roles.Admin), nameof(Roles.Locatario)));
});

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Configuração de CORS corrigida
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://frontend-ajbn.onrender.com") // Substitua pelos domínios específicos que você deseja permitir
                  .AllowCredentials()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Serviço de gestão de usuários");
        c.RoutePrefix = string.Empty; // Para carregar o Swagger na raiz (http://localhost:<port>/)
    });
}
// else if(!app.Environment.IsDevelopment() && Environment.GetEnvironmentVariable("DISABLE_HTTPS_REDIRECTION") != "true")
// {
//     app.UseHttpsRedirection();
//     app.UseHsts(); // HSTS apenas em produção
// }

// Configurar o HangFire na aplicacao

app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    Authorization = null // Temporariamente desabilitar autenticação para teste
});
app.UseHangfireServer();

RecurringJob.AddOrUpdate<HangfireJobsHelper>(
    "verificar-usuarios-inativos",
    x => x.VerificarUsuariosInativos(),
    Cron.DayInterval(15));
//Cron.Minutely);

// Se tiver em prod pular isso

if (env == "Development")
{
    app.UseHttpsRedirection();
}

if (env == "Development")
{
app.UseHttpsRedirection();
}
app.UseCors("AllowSpecificOrigins");
app.UseRouting();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();