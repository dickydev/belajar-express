import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Book = db.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "book",
    timestamps: true,
  }
);

export default Book;
