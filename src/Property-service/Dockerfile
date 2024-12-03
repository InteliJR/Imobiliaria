# Etapa 1: Imagem base para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Definir o diret�rio de trabalho
WORKDIR /source

# Copiar arquivos de solu��o e de projeto
COPY *.sln ./
COPY "Layer.Application/*.csproj" "./Layer.Application/"
COPY "Layer.Domain/*.csproj" "./Layer.Domain/"
COPY "Layer.Insfrastructure/*.csproj" "./Layer.Insfrastructure/"
COPY "Layer.Services/*.csproj" "./Layer.Services/"

# Limpar o cache de pacotes do NuGet
RUN dotnet nuget locals all --clear

# Restaurar depend�ncias
RUN dotnet restore "./Layer.Application/Layer.Application.csproj" --force

# Copiar o restante do c�digo fonte
COPY . .

RUN dotnet restore "/source/Layer.Application/Layer.Application.csproj" --force

# Compilar o projeto em modo Release
RUN dotnet build "./Layer.Application/Layer.Application.csproj" -c Release

# Publicar o aplicativo
RUN dotnet publish "./Layer.Application/Layer.Application.csproj" -c Release -o /app --no-restore

# Etapa 2: Imagem base para runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Definir o diret�rio de trabalho no container
WORKDIR /app

# Copiar a sa�da da compila��o da etapa anterior
COPY --from=build /app .

# Copiar o arquivo .env e o arquivo de credenciais do Firebase
COPY "./Layer.Application/.env.production" .env.production
# COPY "./Layer.Application/administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json" /app

# Definir a vari�vel de ambiente para o caminho do arquivo de credenciais do Firebase
# ENV GOOGLE_APPLICATION_CREDENTIALS="/app/administradora-kk-firebase-adminsdk-1fa3k-7b4c700bd8.json"

ENV ASPNETCORE_URLS=http://+:8083

# Expor a porta que a aplica��o vai utilizar
EXPOSE 8083

# Iniciar a aplica��o e carregar vari�veis de ambiente
CMD ["bash", "-c", "export $(cat .env | xargs) && dotnet Layer.Application.dll"]
