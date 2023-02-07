# NGINX + Node + MySQL challenge

In this challenge, I created a web server app using NGINX, Node and MySQL

To do it, I used three images:

- nginx:1.15.0-alpine as a reverse proxy;
- nodejs:15 as a web server;
- mysql 5.7 as a database.

Building and running image:

```
docker compose up -d # docker-compose up -d - it depends you docker version
# Nav
# Full Cycle Rocks!!
# Users List
```

At first runnig, you won't have any user do be listed. To create a new user, you can access `/create` page an then back to the home page.