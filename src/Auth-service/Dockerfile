# Etapa 1: Imagem base para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Definir o diretório de trabalho
WORKDIR /source
    

# Copiar arquivos de solução e de projeto
COPY *.sln ./
COPY Layer.Application/*.csproj ./Layer.Application/
COPY Layer.Domain/*.csproj ./Layer.Domain/
COPY Layer.Infrastructure/*.csproj ./Layer.Infrastructure/
COPY Layer.Services/*.csproj ./Layer.Services/

# Limpar o cache de pacotes do NuGet
RUN dotnet nuget locals all --clear

# Restaurar dependências
RUN dotnet restore ./Layer.Application/Layer.Application.csproj --force

# Copiar o restante do código fonte
COPY . .

# Compilar o projeto em modo Release
RUN dotnet build ./Layer.Application/Layer.Application.csproj -c Release

# Publicar o aplicativo
RUN dotnet publish ./Layer.Application/Layer.Application.csproj -c Release -o /app --no-restore

# Etapa 2: Imagem base para runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar a saída da compilação da etapa anterior
COPY --from=build /app .

# Copiar o arquivo .env do diretório Layer.Application para o diretório de trabalho do container
COPY Layer.Application/.env.production .env.production

# Expor a porta que a aplicação vai utilizar
EXPOSE 8080

# Definir a variável de ambiente para especificar a URL e a porta
ENV ASPNETCORE_URLS=http://+:8080

ENV DISABLE_HTTPS_REDIRECTION=true

# Iniciar a aplicação
# CMD ["bash", "-c", "export $(cat .env | xargs) && dotnet Layer.Application.dll"]
CMD ["dotnet", "Layer.Application.dll"]
