# Etapa 1: Imagem base para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Definir o diretório de trabalho
WORKDIR /source

# Copiar arquivos de solução e de projeto
COPY *.sln ./
COPY "Layer.Application/*.csproj" "./Layer.Application/"
COPY "Layer.Domain/*.csproj" "./Layer.Domain/"
COPY "Layer.Insfrastructure/*.csproj" "./Layer.Insfrastructure/"
COPY "Layer.Services/*.csproj" "./Layer.Services/"

# Limpar o cache de pacotes do NuGet
RUN dotnet nuget locals all --clear

# Restaurar dependências
RUN dotnet restore "./Layer.Application/Layer.Application.csproj" --force

# Copiar o restante do código fonte
COPY . .

# Compilar o projeto em modo Release
RUN dotnet build "./Layer.Application/Layer.Application.csproj" -c Release

# Publicar o aplicativo
RUN dotnet publish "./Layer.Application/Layer.Application.csproj" -c Release -o /app --no-restore

# Etapa 2: Imagem base para runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar a saída da compilação da etapa anterior
COPY --from=build /app .

# Copiar o arquivo .env e o arquivo de credenciais do Firebase
COPY "./Layer.Application/.env" .env
COPY "./Layer.Application/imobiliaria-kk-firebase-adminsdk-f1416-d5111edc74.json" /app

# Definir a variável de ambiente para o caminho do arquivo de credenciais do Firebase
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/imobiliaria-kk-firebase-adminsdk-f1416-d5111edc74.json"

# Expor a porta que a aplicação vai utilizar
EXPOSE 8080

# Iniciar a aplicação e carregar variáveis de ambiente
CMD ["bash", "-c", "export $(cat .env | xargs) && dotnet Layer.Application.dll"]
