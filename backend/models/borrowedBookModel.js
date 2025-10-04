import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import User from "./userModel.js";

const BorrowedBook = sequelize.define(
  "BorrowedBook",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "borrowed_books",
  }
);

// Relationship: One user → Many borrowed books
User.hasMany(BorrowedBook, { foreignKey: "userId" });
BorrowedBook.belongsTo(User, { foreignKey: "userId" });

export default BorrowedBook;
