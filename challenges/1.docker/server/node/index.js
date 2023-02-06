const express = require("express");
const app = express();
const Home = require("./pages/Home");

app.use((req, _, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", async (_, res) => {
    const Page = await Home();
    res.send(Page);
});

// app.post("/", async (req, res) => {
//     User.create(req.body?.name);
//     const Page = await Home();
//     res.send(Page);
// });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app is running on port: ${PORT}`);
});
