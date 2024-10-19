import Book from "./book.js";
import Category from "./category.js";

const associateModels = () => {
  Category.hasMany(Book, {
    foreignKey: "categoryId",
    as: "books",
  });

  Book.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
  });
};

export default associateModels;
