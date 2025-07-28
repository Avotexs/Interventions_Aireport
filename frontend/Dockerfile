# Étape 1 : Build Angular
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Étape 2 : Serve Angular avec Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/* /usr/share/nginx/html/
EXPOSE 80