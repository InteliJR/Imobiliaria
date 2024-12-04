FROM nginx:alpine

# Copia o script de processar logs e variáveis de ambiente
COPY process_logs.sh /usr/local/bin//process_logs.sh
COPY .env /usr/local/bin/.env

# Conceder permissão de execução ao script
RUN chmod +x /app/process_logs.sh

# Inclui a dependência mongoimport
RUN apk add --no-cache mongodb-tools

# Copia a configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor portas que o container irá ouvir
EXPOSE 8093

# Definir o diretório de trabalho
WORKDIR /app
