const connection = require("../connection");

const Page = async () => {
    const Element = `
       <h1>Full Cycle Rocks!</h1>
       <a href="/">Home</a>
       <form method="get">
            <label>
            Name:
            <input type="text" name="name" />
            </label>
       </form>
    `;

    return Element;
};

module.exports = Page;
