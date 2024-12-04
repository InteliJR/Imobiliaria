#!/bin/bash

# Lê as variáveis de ambiente do arquivo .env
source /usr/local/bin/

# O arquivo de log gerado pelo nginx
LOG_FILE="/var/log/nginx/access.log"

# Nome do banco de dados e coleção no MongoDB
DB_NAME="application_logs"
COLLECTION_NAME="logs"

# Verifica se o arquivo de log existe
if [ -f "$LOG_FILE" ]; then
    # Processa os logs e envia para o MongoDB com mongoimport
    cat "$LOG_FILE" | jq -R -s -c 'split("\n") | map(select(length > 0))' | \
    mongoimport --uri "mongodb://$MONGO_USER:$MONGO_PASSWORD@$MONGO_HOST:$MONGO_PORT/$DB_NAME" \
                --collection "$COLLECTION_NAME" --type json --drop
else
    echo "Arquivo de log não encontrado: $LOG_FILE"
fi
