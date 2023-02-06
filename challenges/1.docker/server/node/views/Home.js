const UserModel = require("../models/User");

const Page = async () => {
    const users = await UserModel.get();
    const HAS_USERS = Boolean(users.length);

    const Element = `
       <h1>Full Cycle Rocks!</h1>
       <a href="/create">Create</a>
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
