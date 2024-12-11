for folder in Auth-service/Layer.Application Property-service/Layer.Application Payment-service/Layer.Application; do
  touch $folder/.env.production
  echo "ENVIRONMENT=production" > $folder/.env.production
done

