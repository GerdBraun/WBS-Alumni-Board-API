import { DataTypes } from "sequelize";
import { Skill, Job } from "../db.js";

export default (sequelize) => {
  const BridgeJobSkill = sequelize.define("BridgeJobSkill", {
    ProjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Job,
        key: "id",
      },
    },
    SkillId: {
      type: DataTypes.INTEGER,
      references: {
        model: Skill,
        key: "id",
      },
    },
  });
  return BridgeJobSkill;
};
