const { errorPathHandler, addBookHandler } = require("./handler");

const routes = [
  {
    method: "*",
    path: "/{pathInp*}",
    handler: errorPathHandler,
  },
  {
    method: "Post",
    path: "/books",
    handler: addBookHandler,
  },
];

module.exports = routes;
