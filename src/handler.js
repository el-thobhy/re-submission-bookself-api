const errorPathHandler = (req, h) => {
  const { pathInp } = req.params;
  return {
    status: "Error",
    message: `Halaman ${pathInp} tidak ditemukan`,
  };
};

module.exports = { errorPathHandler };
