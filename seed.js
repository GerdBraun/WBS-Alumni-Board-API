import { sequelize, User, Company } from "./db.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });
  const users = [
    {
      firstName: "Gerd",
      lastName: "Braun",
      email: "webmaster@your-d-sign.de",
      password: "Start$2017",
      role: "admin",
      companyId:1
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      password: "12345678",
      role: "user"
    },
  ];

  const companies = [
    {
        name:"myCompany"
    }
  ]

  await User.bulkCreate(users, { individualHooks: true });
  await Company.bulkCreate(companies, { individualHooks: true });
};

try {
    await seedDB();
    console.log("Database seeded");
  } catch (error) {
    console.error({ error });
  } finally {
    sequelize.close();
    console.log("Database connection closed");
  }
  