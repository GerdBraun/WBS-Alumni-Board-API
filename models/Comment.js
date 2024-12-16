import { DataTypes } from "sequelize";
import { User } from "../db.js";

export default (sequelize) => {
  const Comment = sequelize.define("Comment", {
    parent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Comment;
};
