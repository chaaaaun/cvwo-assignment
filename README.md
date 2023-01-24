# CVWO Web Forum: Sakura

Built for the Computing for Voluntary Welfare Organisations (CVWO) AY2022/23 application by **Tu Jia En (A0252321W)**.

## Running from Docker image

Prebuilt Docker images are available on [Docker Hub](https://hub.docker.com/r/chauuun/golang-sakura).

Simply pull any image with 
```
docker pull chauuun/golang-sakura
``` 
Then spin up a container, supplying the following environment variables:
- `JWT_SECRET`: Secret for the app to generate JWT tokens
- `DB_STR`: Your local or remote database connection string
- `PORT`: optional, defaults to `8000`

## Building from source

View the `README`s respective subdirectories for instructions to build the app from the source code.

