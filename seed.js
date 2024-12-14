import {
  sequelize,
  User,
  Company,
  Job,
  Skill,
  BridgeUserSkill,
  BridgeProjectSkill,
  Project,
} from "./db.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });
  const users = [
    {
      firstName: "Gerd",
      lastName: "Braun",
      email: "webmaster@your-d-sign.de",
      password: "Start$2017",
      role: "admin",
      companyId: 1,
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      password: "12345678",
      role: "moderator",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@doe.com",
      password: "12345678",
      role: "user",
    },
  ];

  const companies = [
    {
      name: "myCompany A",
    },
    {
      name: "myCompany B",
    },
  ];

  const jobs = [
    {
      title: "Junior fullstack developer",
      description: "lorem ipsum dolor sit amet sic constetutur...",
      location: "Berlin",
      link: "https://www.wbscodingschool.com/",
      companyId: 1,
      ownerId: 1,
    },
    {
      title: "Senior fullstack developer",
      description: "lorem ipsum dolor sit amet sic constetutur...",
      location: "Munich",
      link: "https://www.wbscodingschool.com/",
      companyId: 2,
      ownerId: 2,
    },
  ];

  const skills = [
    {
      name: "JavaScript",
    },
    {
      name: "CSS",
    },
    {
      name: "React",
    },
    {
      name: "Express",
    },
  ];

  const bus = [
    {
      UserId: 1,
      SkillId: 1,
    },
    {
      UserId: 1,
      SkillId: 2,
    },
  ];

  const projects = [
    {
      title: "Project A",
      description: "lorem ipsum dolor sit amet...",
      ownerId:1
    },
    {
      title: "Project B",
      description: "lorem ipsum dolor sit amet...",
      ownerId:2
    },
  ];

  const bps = [
    {
      ProjectId: 1,
      SkillId: 1,
    },
    {
      ProjectId: 1,
      SkillId: 2,
    },
    {
      ProjectId: 2,
      SkillId: 3,
    },
  ];

  await User.bulkCreate(users, { individualHooks: true });
  await Company.bulkCreate(companies, { individualHooks: true });
  await Job.bulkCreate(jobs, { individualHooks: true });
  await Skill.bulkCreate(skills, { individualHooks: true });
  await BridgeUserSkill.bulkCreate(bus, { individualHooks: true });
  await Project.bulkCreate(projects, { individualHooks: true });
  await BridgeProjectSkill.bulkCreate(bps, { individualHooks: true });
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
