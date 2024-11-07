using DotNetEnv;
using property_management.Contracts;
using property_management.Models;

var builder = WebApplication.CreateBuilder(args);

// Carregar variáveis do .env
Env.Load();

var URL = Environment.GetEnvironmentVariable("SUPABASE_URL");
var KEY = Environment.GetEnvironmentVariable("SUPABASE_KEY");

var options = new Supabase.SupabaseOptions
{
    AutoConnectRealtime = true
};

// Inicializando o Supabase Client
var supabase = new Supabase.Client(supabaseUrl: URL, supabaseKey: KEY, options);
await supabase.InitializeAsync();

// Registrar Supabase Client no container de serviços
builder.Services.AddSingleton(supabase);

var app = builder.Build();

// Middlewares
app.UseSwagger();
app.UseSwaggerUI();

// Rota simples para verificar se a API está funcionando
app.MapGet("/", () => "API funcionando!");

// Endpoint para criar uma nova newsletter
app.MapPost("/newsletter", async (
    CreateNewsletterRequest request,
    Supabase.Client client) =>
{
    var newsletter = new Newsletter
    {
        Name = request.Name,
        Description = request.Description,
        ReadTime = request.ReadTime
    };

    var response = await client.From<Newsletter>().Insert(newsletter);
    var newNewsletter = response.Models.First();

    return Results.Ok(newNewsletter.Id);
});

app.Run();
