# POEC_FIL_ROUGE_KAMBAN

# Start Docker in development mode

In a first terminal, to root of project:
```
./dev_start.sh
```
or
```
docker compose --file docker-compose-dev.yml up
```


In a second terminal, to root of project:
```
cd Taskwave
npm i -g @angular/cli@17.3.2
npm i
ng serve --open
```

# Start Docker in production mode

In a first terminal, to root of project:
```
./prod_start.sh
```
or
```
docker compose --file docker-compose-prod.yml up --build
```


In a second terminal, to root of project:
```
start http://localhost:8080
```