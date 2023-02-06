const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "users",
});

app.use((req, _, next) => {
    console.log(req.method, req.url);
    next();
});

const User = {
    create: (user = "") => {
        if (!user) return;
        connection.query(
            `INSERT INTO people(name) values('${user}')`,
            (error) => {
                if (error) throw error;
            }
        );
    },
    get: () =>
        new Promise(function (resolve, reject) {
            connection.query("SELECT * FROM people", (error, results) => {
                if (error) reject(error);
                resolve(JSON.parse(JSON.stringify(results)));
            });
        }),
};

const Home = async () => {
    const users = await User.get();
    const HAS_USERS = Boolean(users.length);

    const Element = `
       <h1>Full Cycle Rocks!</h1>
        <form method="post">
        <label for="name">
            <input type="text" name="name" />
        </label>
        </form>
        ${
            HAS_USERS
                ? `
                    <ul>
                        ${users
                            .map((user) => `<li>${user.id} - ${user.name}</li>`)
                            .join("")}
                    </ul>
                `
                : ""
        }
    `;

    return Element;
};

app.get("/", async (req, res) => {
    const Page = await Home();
    res.send(Page);
});

app.post("/", async (req, res) => {
    User.create(req.body?.name);
    const Page = await Home();
    res.send(Page);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app is running on port: ${PORT}`);
});
