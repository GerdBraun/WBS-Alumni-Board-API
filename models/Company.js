import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Company = sequelize.define("Company", {
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
