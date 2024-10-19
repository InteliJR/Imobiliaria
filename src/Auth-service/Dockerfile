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

# Restaurar dependências
RUN dotnet restore

# Copiar o restante do código fonte
COPY . .

# Compilar o projeto em modo Release
RUN dotnet build -c Release --no-restore