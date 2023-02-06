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

const Page = async () => {
    const users = await User.get();
    const HAS_USERS = Boolean(users.length);

    const Element = `
       <h1>Full Cycle Rocks!</h1>
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

module.exports = Page;
