# Utilisez l'image MySQL officielle comme point de départ
FROM mysql:latest

# Définissez les variables d'environnement pour le mot de passe root MySQL
ENV MYSQL_ROOT_PASSWORD trello_admin

EXPOSE 3306

# Ajoutez un script SQL personnalisé pour initialiser la base de données
# Assurez-vous que le script SQL est copié dans le même répertoire que ce Dockerfile
COPY init.sql /docker-entrypoint-initdb.d/
