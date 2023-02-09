# NGINX + Node + MySQL challenge

In this challenge, I created a web server app using NGINX, Node and MySQL

To do it, I used three images:

- nginx:1.15.0-alpine as a reverse proxy;
- nodejs:15 as a web server;
- mysql 5.7 as a database.

Building and running image:

```
docker compose up -d # docker-compose up -d depending your docker/compose version
# Output:
# Full Cycle Rocks!!
# Nav
# Users List
```

After server is started, you will see in your console:


```
app is running on port: 3000
```

And then, you can access `localhost:8080` using your browser to see the app on line.

To create a new user, you can access `/create` page and then, back to the home page.
