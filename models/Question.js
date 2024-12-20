import { DataTypes } from "sequelize";
import { User } from "../db.js";

export default (sequelize) => {
  const Question = sequelize.define("Question", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
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
