import Book from "../models/book.js";

// GET ALL BOOK
export const getAllBook = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch books",
    });
  }
};

// CREATE BOOK
export const createBook = async (req, res) => {
  const { title, author, publicationYear } = req.body;
  try {
    const book = await Book.create({ title, author, publicationYear });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create book",
    });
  }
};

// GET BOOK BY ID
export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch book by id",
    });
  }
};

// UPDATE BOOK
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publicationYear } = req.body;

  try {
    const [updated] = await Book.update(
      { title, author, publicationYear },
      {
        where: { id },
      }
    );
    if (updated === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to updated book",
    });
  }
};

// DELETE BOOK
export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Book.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({
        message: "Book id not found",
      });
    }
    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete the book",
    });
  }
};
