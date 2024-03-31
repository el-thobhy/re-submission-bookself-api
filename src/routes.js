const routes = [
  {
    method: "*",
    path: "/{any*}",
    handler: () => "Halaman tidak ditemukan",
  },
];

module.exports = routes;
