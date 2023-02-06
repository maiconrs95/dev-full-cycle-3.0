const connection = require("../connection");

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

module.exports = User;
