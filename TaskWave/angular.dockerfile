# Utiliser l'image Node.js comme image de base
FROM node:latest

# Définir le répertoire de travail dans l'image
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY ./*.json ./

# Installer les dépendances du projet
RUN npm install -g npm@10.5.1
RUN npm install
RUN npm install -g @angular/cli


# Exposer le port 4200 pour l'application Angular
EXPOSE 8080

# Commande par défaut pour démarrer l'application avec ng serve
CMD ["npm", "start"]
