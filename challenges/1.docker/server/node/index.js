const express = require("express");
const app = express();
const Home = require("./views/Home");
const Create = require("./views/Create");

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

app.listen(PORT, () => {
    console.log(`app is running on port: ${PORT}`);
});
