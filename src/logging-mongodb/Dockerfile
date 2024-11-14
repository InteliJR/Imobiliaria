# Dockerfile para MongoDB com autenticação

# Utiliza a imagem oficial do MongoDB
FROM mongo:latest

# # Defina as variáveis de ambiente para autenticação
# ARG MONGO_INITDB_ROOT_USERNAME
# ARG MONGO_INITDB_ROOT_PASSWORD

# # Configura as variáveis no ambiente
# ENV MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME
# ENV MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD

# Inicia o MongoDB com autenticação ativada
CMD ["mongod", "--auth"]
