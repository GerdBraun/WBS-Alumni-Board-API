import { sequelize, User } from "./db.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });
  const users = [
    {
      firstName: "Gerd",
      lastName: "Braun",
      email: "webmaster@your-d-sign.de",
      password: "Start$2017",
      role: "admin"
    },
  ];

  await User.bulkCreate(users, { individualHooks: true });
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
  