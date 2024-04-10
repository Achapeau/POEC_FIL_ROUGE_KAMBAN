# Utilisez l'image officielle Node.js comme point de départ
FROM node:latest AS build

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers de votre application Angular dans le conteneur
COPY . .

# Installez les dépendances
RUN npm install

# Construisez votre application Angular
RUN npm run build --prod

# Utilisez l'image officielle nginx pour servir votre application Angular
FROM nginx:alpine

# Copiez le build de votre application depuis l'étape de construction précédente vers le répertoire de travail de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposez le port 80
EXPOSE 8080

# Commande par défaut pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
