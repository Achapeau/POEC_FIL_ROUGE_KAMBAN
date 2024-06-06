#!/bin/bash
# lance l'environnement docker prod
docker compose --file docker-compose-prod.yml up --build
# lancer l'environnement docker prod
# docker compose up
# lancer le page web
# start http://localhost:8080
# cd TaskWave
# npm install -g npm@10.5.2
# npm install
# ng serve --port 8080 --open