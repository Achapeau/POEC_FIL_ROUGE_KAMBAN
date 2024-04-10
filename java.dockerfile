# Utilisez l'image de base Java
FROM openjdk:21-jdk

# Définissez le répertoire de travail
# WORKDIR /app

# Copiez le fichier JAR de l'application dans le conteneur
# ARG JAR_FILE=../target/*.jar
WORKDIR /app
# COPY . /app
COPY ./target/*.jar app.jar

EXPOSE 3050

# Commande pour exécuter l'application au démarrage du conteneur
CMD ["java", "-jar", "app.jar"]