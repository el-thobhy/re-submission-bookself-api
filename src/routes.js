const {
  errorPathHandler,
  addBookHandler,
  getAllBookHandler,
  getDetailBookHandler,
  updateBookByIdHandler,
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
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getDetailBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookByIdHandler,
  },
];

module.exports = routes;
