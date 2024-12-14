import { DataTypes } from "sequelize";
import { Skill, Project } from "../db.js";

export default (sequelize) => {
  const BridgeProjectSkill = sequelize.define("BridgeProjectSkill", {
    ProjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
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
  return BridgeProjectSkill;
};
