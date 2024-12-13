import { Sequelize } from "sequelize";
import CompanyModel from "./models/Company.js";
import UserModel from "./models/User.js";
import JobModel from "./models/Job.js";

// use neon database (see .env file)
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Company = CompanyModel(sequelize);
const User = UserModel(sequelize);
const Job = JobModel(sequelize);

User.hasMany(Job, { foreignKey: "id" });
Job.belongsTo(User, { foreignKey: "ownerId" });

User.hasOne(Company, { foreignKey: "id" });


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
}