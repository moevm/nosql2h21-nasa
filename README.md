# 2021 NOSQL Course work

## How-to build

Build in root folder:

```
sudo docker-compose build
sudo docker-compose up
```

It's better to use:

```
docker-compose up --build --force-recreate  --renew-anon-volumes
```

In root folder create file `.env`:

```
MONGO_USERNAME=bob
MONGO_PASSWORD=qwerty
MONGO_HOSTNAME=mongo
MONGO_PORT=27017
MONGO_DB=nosql_nasa
```

> DISCLAIMER: NOT FOR PRODUCTION!

If you have already worked with this project please do:

```
docker-compose rm -f
docker-compose pull
```

Remove all volumes:

```
docker system prune  
docker volume rm $(docker volume ls -qf dangling=true)
```
