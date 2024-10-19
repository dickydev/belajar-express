import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Category = db.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: true,
  }
);

export default Category;
