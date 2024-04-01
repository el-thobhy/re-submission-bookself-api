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
  const { name, reading, finished } = req.query;
  if (name) {
    const query = books.filter((book) => {
      const reg = new RegExp(name, "ig"); // i=insensitive case, g=globa
      return reg.test(book.name);
    });
    const res = h.response({
      status: "success",
      data: {
        books: query.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    res.code(200);
    return res;
  }

  if (reading) {
    const query = books.filter(
      (book) => Number(book.reading) === Number(reading)
    );
    const res = h.response({
      status: "success",
      data: {
        books: query.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    res.code(200);
    return res;
  }
  if (finished) {
    const query = books.filter(
      (book) => Number(book.finished) === Number(finished)
    );
    const res = h.response({
      status: "success",
      data: {
        books: query.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    res.code(200);
    return res;
  }

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

const getDetailBookHandler = (req, h) => {
  const { bookId } = req.params;
  const book = books.filter((b) => b.id === bookId)[0];
  if (book !== undefined) {
    const res = h.response({
      status: "success",
      data: {
        book,
      },
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  res.code(404);
  return res;
};

const updateBookByIdHandler = (req, h) => {
  const { bookId } = req.params;
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
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (name === undefined) {
    const res = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    res.code(400);
    return res;
  }
  if (readPage > pageCount) {
    const res = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    res.code(400);
    return res;
  }
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const res = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  res.code(404);
  return res;
};
const deleteBookByIdHandler = (req, h) => {
  const { bookId } = req.params;

  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const res = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  res.code(404);
  return res;
};

module.exports = {
  errorPathHandler,
  addBookHandler,
  getAllBookHandler,
  getDetailBookHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
