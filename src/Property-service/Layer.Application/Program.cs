using Microsoft.OpenApi.Models;
using Layer.Domain.Interfaces;
using Layer.Services.Services;
using Layer.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using DotNetEnv;
using System.Text;
using Layer.Domain.Entites;
using Layer.Domain.Enums;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using MongoDB.Driver;
using Layer.Domain.Entities;


var builder = WebApplication.CreateBuilder(args);

// Carregar variáveis de ambiente do arquivo .
var env = builder.Environment.EnvironmentName;

if (env == "Development")
{
    Env.Load(".env.development");
}
else if (env == "Production")
{
    // Env.Load(".env.production");
    Env.Load("etc/secrets/.env.production");
}
else
{
    Env.Load();  // Caso você tenha um `.env` padrão
}


var mongoSettings = new MongoDbSettings
{
    ConnectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING"),
    DatabaseName = Environment.GetEnvironmentVariable("MONGO_DATABASE_NAME"),
    LogsCollectionName = Environment.GetEnvironmentVariable("MONGO_LOGS_COLLECTION_NAME") ?? "Logs"
};

// Sobrepor os valores das variáveis no appsettings.json com as variáveis do ambiente
builder.Configuration.AddEnvironmentVariables();

// !!!!! Injenções de dependência !!!

// Vamos usar o AddSingleton usar a msm instância em usada em toda a aplicação
// Se usamos o AddScoped, ele cria uma instância por requisição aí ele vai zerar a lista de mensagens a cada requisição

// Iniciando o Firebase
//FirestoreDb db = FirestoreDb.Create(project);
//Console.WriteLine("Created Cloud Firestore client with project ID: {0}", project);

// Definir o caminho do arquivo de credenciais Firebase corretamente
string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json");

if (!File.Exists(filePath))
{
    filePath = "/etc/secrets/administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json";
}

// Definir a variável de ambiente GOOGLE_APPLICATION_CREDENTIALS
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filePath);




// Verificar se a variável de ambiente FIREBASE_CREDENTIALS_PATH foi configurada corretamente
var firebaseCredentialsPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");

// Verificar se o caminho está correto antes de usar o arquivo
if (!string.IsNullOrEmpty(firebaseCredentialsPath) && File.Exists(firebaseCredentialsPath))
{
    // Criar a credencial do Google a partir do arquivo de credenciais
    var googleCredential = GoogleCredential.FromFile(firebaseCredentialsPath);

    // Inicializar o FirebaseApp usando as credenciais
    FirebaseApp.Create(new AppOptions()
    {
        Credential = googleCredential
    });

    Console.WriteLine("Firebase initialized with credentials from: " + firebaseCredentialsPath);
}
else
{
    // Lidar com erro de arquivo não encontrado ou variável de ambiente não configurada corretamente
    Console.WriteLine("Error: Firebase credentials file not found or environment variable not set.");
}

builder.Services.AddSingleton(mongoSettings);
builder.Services.AddSingleton<IMongoClient>(sp => new MongoClient(mongoSettings.ConnectionString));
builder.Services.AddScoped<IimoveisRepository, ImoveisService>();
builder.Services.AddScoped<IContratosRepository, ContratoService>();
builder.Services.AddScoped<IEmailSender, EmailSenderService>();
builder.Services.AddScoped<IChamadosRepository, ChamadosService>();
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
    options.AddPolicy("AllRolesInsteadJudiciario", policy => policy.RequireRole(nameof(Roles.Admin), nameof(Roles.Locador), nameof(Roles.Locatario)));
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// Configuração de CORS corrigida
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://frontend-ajbn.onrender.com/") // Substitua pelos domínios específicos que você deseja permitir
                  .AllowCredentials()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
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
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Serviço de Gestão de imóveis", Version = "v1" });

    // c.OperationFilter<FileUploadOperationFilter>();

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
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Serviço de gestão de imóveis");
        c.RoutePrefix = string.Empty; // Para carregar o Swagger na raiz (http://localhost:<port>/)
    });
}
//else
//{
//    app.UseExceptionHandler("/Home/Error");
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
// app.UseStaticFiles();

app.Use(async (context, next) =>
{
    Console.WriteLine($"Request Path: {context.Request.Path}");
    await next();
});


app.UseCors("AllowSpecificOrigins");

app.UseCors();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
