---
layout: post
title:  Build Your Node Application By Docker
date:   2016-06-03 10:25:00
categories: node
---

### Build Your Image

Prepare a `Dockerfile` and set up your environment. 

```
# Dockerfile

FROM ubuntu

RUN apt-get update --fix-missing

RUN apt-get install -y curl

RUN apt-get install -y xz-utils

ENV NODE_VERSION "6.2.0"

RUN curl "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" -o node.tar.xz

RUN mv ./node.tar.xz /root

RUN cd /root && tar xf ./node.tar.xz && rm ./node.tar.xz

ENV PATH "/root/node-v$NODE_VERSION-linux-x64/bin:$PATH"

WORKDIR /root/data
```
Prepare a [DockerHub](http://hub.docker.com) Account and my docker hub id is **kataqlee**.

Build your image

```
docker build -t kataqlee/node-6.2 .
```

Login your dockerhub

```
docker login 

```
Push the image to the Dockerhub

```
docker push kataqlee/node-6.2
```

After push, your image is ready.

### Set up Docker Compose

Prepare a `docker-compose.yml`

```
# docker-compose.yml
web: 
  image: node-6.2
  volumes:
    - ".:/root/data" # "/root/data" is the WORKDIR in the image.
  command: npm start
  links:
    - "db:mysql" # "mysql" is the host name to connect mysql database.

db:
  image: mysql:5.7
  volumes:
    - "~/local/mysql:/var/lib/mysql" # Save the data to host folder.
  environment:
    MYSQL_ROOT_PASSWORD: *** 
    MYSQL_USER: DB_USER
    MYSQL_PASSWORD: ***
    MYSQL_DATABASE: DB_NAME

nginx:
  image: nginx
  ports: 
    - "80:80"
  links:
    - "web:application"
  volumes:
    - "./config/nginx.conf:/etc/nginx/conf.d/app.conf" # Config your nginx
```

Set up your application enviroment by docker

```
docker-compose up
```

If you need update your program, update code and run 

```
# Resatrt all services

docker-compose restart

# Restart application and nginx

docker-compose restart web nginx
```

After the steps, your application is set up.
