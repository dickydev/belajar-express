import Category from "./category.js";
import Book from "./book.js";
import associateModels from "./association.js";
import db from "../config/db.js";

const syncAndAssociateModels = async () => {
  try {
    associateModels();
    await db.sync({ alter: true }); //untuk menghindari reset table
    console.log("Database and models synced successfully");
  } catch (error) {
    console.error("Failed to sync models, ", error);
  }
};

export { Category, Book, syncAndAssociateModels };
