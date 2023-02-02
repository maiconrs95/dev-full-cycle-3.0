const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "users",
});
const port = 3000;

const User = {
    create: (user = "") => {
        if (!user) return;
        connection.query(`INSERT INTO people(name) values('${user}')`);
        connection.end();
    },
    get: () => {
        const users = connection.query("SELECT * FROM people");
        connection.end();
    },
};

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

const Home = () => {
    const users = User.get();
    console.log(users);
    return `
        <h1>Full Cycle Rocks!</h1>
        <form method="get">
        <label for="name">
            <input type="text" name="name" />
         </label>
        </form>
    `;
};

app.get("/", (req, res) => {
    User.create(req.query?.name);
    res.send(Home());
});

app.listen(3000, () => {
    console.log(`app is running on port: ${port}`);
});
