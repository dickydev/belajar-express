import Category from "../models/category.js";
import Book from "../models/book.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        msg: "Please provide both name and description",
      });
    }

    const newCategory = await Category.create({
      name,
      description,
    });

    return res
      .status(201)
      .json({ msg: "Category created successfully ", category: newCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to create category", error: error.message });
  }
};

export const getCategoriesWithBook = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Book,
          as: "books",
        },
      ],
    });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ msg: "Failed to fetch categories" });
  }
};
