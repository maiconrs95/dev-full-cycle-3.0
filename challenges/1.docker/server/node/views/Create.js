const connection = require("../connection");

const Page = async () => {
    const Element = `
        <h1>Full Cycle Rocks!</h1>
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
            </ul>
        </nav>
        <form method="get">
            <label>
                Name:
                <input type="text" name="name" required />
            </label>
        </form>
    `;

    return Element;
};

module.exports = Page;
