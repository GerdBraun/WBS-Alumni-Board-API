import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Company = sequelize.define("company", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Company;

};
