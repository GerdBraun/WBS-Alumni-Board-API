import { DataTypes } from "sequelize";
import { Company, User } from "../db.js";

export default (sequelize) => {
  const Job = sequelize.define("Job", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId:{
        type:DataTypes.INTEGER,
        references: {
          model: Company,
          key: "id",
        },
    },
    ownerId:{
        type:DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
    },
  });
  return Job;

};
