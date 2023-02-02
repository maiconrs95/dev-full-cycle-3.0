FROM node:15-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*",  "index.js", "./"]

RUN npm install

COPY . .

ENTRYPOINT [ "node", "index.js" ]

EXPOSE 3000