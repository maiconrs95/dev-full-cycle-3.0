const express = require("express");
const app = express();
// const mysql = require("mysql");

const port = 3000;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

const Home = () => {
    return `<h1>Hello Express!</h1>`;
};

app.get("/", (_, res) => {
    res.send(Home());
});

app.listen(3000, () => {
    console.log(`app is running on port: ${port}`);
});
