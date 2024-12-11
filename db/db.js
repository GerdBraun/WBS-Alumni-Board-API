import { Sequelize } from "sequelize";
import CompanyModel from "../models/Company.js";

//const sequelize = new Sequelize(process.env.DATABASE_URL);
const sequelize = new Sequelize("your-d-sign_wbs_alumni", "wbs_usr", "Start$2017", {
	host:"localhost",
	port:"3306",
	dialect: "mariadb",
});

const Company = CompanyModel(sequelize);

try {
  await sequelize.sync({ force: false });
  console.log("Database is ready");
} catch (error) {
  console.error("\x1b[31m%s\x1b[0m", error);
}


export {
    sequelize,
    Company
}