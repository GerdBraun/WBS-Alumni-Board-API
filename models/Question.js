import { DataTypes } from "sequelize";
import { User } from "../db.js";

export default (sequelize) => {
  const Question = sequelize.define("Question", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  });
  return Question;
};
