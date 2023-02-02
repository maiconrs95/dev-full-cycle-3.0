FROM node:15-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*",  "server.js", "./"]

RUN npm install

COPY . .

ENTRYPOINT [ "node", "server.js" ]

EXPOSE 3000