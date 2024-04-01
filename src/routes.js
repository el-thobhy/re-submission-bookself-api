const {
  errorPathHandler,
  addBookHandler,
  getAllBookHandler,
} = require("./handler");

const routes = [
  {
    method: "*",
    path: "/{pathInp*}",
    handler: errorPathHandler,
  },
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBookHandler,
  },
];

module.exports = routes;
