import { DataTypes } from "sequelize";
import { Company, User } from "../db.js";

export default (sequelize) => {
  const Project = sequelize.define("Project", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateFrom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId:{
        type:DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
    },
  });
  return Project;

};
