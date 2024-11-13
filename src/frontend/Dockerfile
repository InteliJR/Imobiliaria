    FROM node:16-alpine AS build

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

    COPY . . 

    RUN npm run build

    # Parte 2 exibir os arquivos estaticos com Nginx

    FROM nginx:alpine

    COPY --from=build /app/dist /usr/share/nginx/html

    EXPOSE 83

    CMD ["nginx", "-g", "daemon off;"]