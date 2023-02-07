const express = require("express");
const app = express();
const Home = require("./views/Home");
const Create = require("./views/Create");
const con = require("./connection");

const UserModel = require("./models/User");

app.use((req, _, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", async (_, res) => {
    const Page = await Home();
    res.send(Page);
});

app.get("/create", async (req, res) => {
    UserModel.create(req.query?.name);
    const Page = await Create();
    res.send(Page);
});

const PORT = 3000;

app.listen(PORT, async () => {
    con.query(
        "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));"
    );

    const users = await UserModel.get();
    const HAS_USERS = Boolean(users.length);

    if (!HAS_USERS) {
        con.query("INSERT INTO people (name) values ('Jogador Nº 1');");
    }

    console.log(`app is running on port: ${PORT}`);
});
