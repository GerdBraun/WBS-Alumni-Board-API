import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Skill = sequelize.define("Skill", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Skill;

};
