# Stage 1: Build the Angular app (both browser and server)
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod  # Ensure this builds both browser and server outputs

# Stage 2: Node.js server image
FROM node:22 AS node_server
WORKDIR /app
COPY --from=build /app/dist/profilm-front /app/dist/profilm-front
EXPOSE 4000
CMD ["node", "dist/profilm-front/server/server.mjs"]

# Stage 3: Nginx image for serving static files (optional)
FROM nginx:alpine AS nginx
COPY --from=build /app/dist/profilm-front/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]