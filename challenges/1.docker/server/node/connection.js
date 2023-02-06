const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "users",
});

module.exports = connection;
