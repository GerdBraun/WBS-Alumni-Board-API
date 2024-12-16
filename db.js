import { Sequelize } from "sequelize";
import CompanyModel from "./models/Company.js";
import UserModel from "./models/User.js";
import JobModel from "./models/Job.js";
import ProjectModel from "./models/Project.js";
import SkillModel from "./models/Skill.js";
import BridgeUserSkillModel from "./models/BridgeUserSkill.js";
import BridgeProjectSkillModel from "./models/BridgeProjectSkill.js";
import CommentModel from "./models/Comment.js";

// use neon database (see .env file)
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Company = CompanyModel(sequelize);
const User = UserModel(sequelize);
const Job = JobModel(sequelize);
const Project = ProjectModel(sequelize);
const Skill = SkillModel(sequelize);
const BridgeUserSkill = BridgeUserSkillModel(sequelize);
const BridgeProjectSkill = BridgeProjectSkillModel(sequelize);
const Comment = CommentModel(sequelize);

User.hasOne(Company, { foreignKey: "id" });

User.hasMany(Job, { foreignKey: "id" });
Job.belongsTo(User, { foreignKey: "ownerId" });

Company.hasMany(Job, { foreignKey: "id" });
Job.hasOne(Company, { foreignKey: "id" });

User.hasMany(Project, { foreignKey: "id" });
Project.belongsTo(User, { foreignKey: "ownerId" });

/**
 * associations User - Skill
 */
User.hasMany(BridgeUserSkill, { foreignKey: "UserId" });
Skill.hasMany(BridgeUserSkill, { foreignKey: "SkillId" });

User.belongsToMany(Skill, { through: BridgeUserSkill });
Skill.belongsToMany(User, { through: BridgeUserSkill });

BridgeUserSkill.hasOne(Skill, { foreignKey: "id" });
BridgeUserSkill.hasOne(User, { foreignKey: "id" });

/**
 * associations Project - Skill
 */
Project.hasMany(BridgeProjectSkill, { foreignKey: "ProjectId" });
Skill.hasMany(BridgeProjectSkill, { foreignKey: "SkillId" });

Project.belongsToMany(Skill, { through: BridgeProjectSkill });
Skill.belongsToMany(Project, { through: BridgeProjectSkill });

BridgeProjectSkill.hasOne(Project, { foreignKey: "id" });
BridgeProjectSkill.hasOne(Skill, { foreignKey: "id" });

/**
 * comments
 */
User.hasMany(Comment, { foreignKey: "id" });
Comment.belongsTo(User, { foreignKey: "ownerId" });

try {
  await sequelize.sync({ force: false });
  console.log("Database is ready");
} catch (error) {
  console.error("\x1b[31m%s\x1b[0m", error);
}

export {
  sequelize,
  User,
  Company,
  Job,
  Skill,
  BridgeUserSkill,
  Project,
  BridgeProjectSkill,
  Comment,
};
