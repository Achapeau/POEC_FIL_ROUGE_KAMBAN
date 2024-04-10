#!/bin/bash
# compile le java en .jar
mvn -Dmaven.test.skip=true -DskipTests=true clean install
# lance l'environnement docker dev
# docker compose up --build
# lancer l'environnement docker prod
docker compose up -d
# lancer le page web
# firefox http://localhost:8080
cd TaskWave
npm install -g npm@10.5.2
npm install
ng serve --port 8080 --open