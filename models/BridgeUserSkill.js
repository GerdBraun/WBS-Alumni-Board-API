import { DataTypes } from "sequelize";
import { Skill, User } from "../db.js";

export default (sequelize) => {
  const BridgeUserSkill = sequelize.define("BridgeUserSkill", {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
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
  return BridgeUserSkill;
};
