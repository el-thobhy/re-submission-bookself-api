const { nanoid } = require("nanoid");
const books = require("./books");

const errorPathHandler = (req, h) => {
  const { pathInp } = req.params;
  const res = h.response({
    status: "error",
    message: `Halaman ${pathInp} tidak ditemukan`,
  });
  res.code(404);
  return res;
};

const addBookHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  if (name === undefined) {
    const res = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    res.code(400);
    return res;
  }
  if (readPage > pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);
    return res;
  }
  const bookInput = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(bookInput);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const res = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  res.code(500);
  return res;
};

const getAllBookHandler = (req, h) => {
  const res = h.response({
    status: "success",
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  res.code(200);
  return res;
};

module.exports = { errorPathHandler, addBookHandler, getAllBookHandler };
