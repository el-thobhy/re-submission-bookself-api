const { errorPathHandler } = require("./handler");

const routes = [
  {
    method: "*",
    path: "/{pathInp*}",
    handler: errorPathHandler,
  },
];

module.exports = routes;
