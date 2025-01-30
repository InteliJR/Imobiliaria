# Dev stage
FROM node:18-alpine AS dev

ENV PORT=5173

WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--host"]

# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
WORKDIR /app/src
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
