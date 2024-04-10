#!/bin/bash
# compile le java en .jar
mvn -Dmaven.test.skip=true -DskipTests=true clean install
# lance l'environnement docker dev
# docker compose up --build
# lancer l'environnement docker prod
docker compose up
# lancer le page web
# firefox http://localhost:8080