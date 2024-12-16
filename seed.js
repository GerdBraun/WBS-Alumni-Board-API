import {
  sequelize,
  User,
  Company,
  Job,
  Skill,
  BridgeUserSkill,
  BridgeProjectSkill,
  Project,
  Comment,
} from "./db.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });
  const users = [
    {
      firstName: "Gerd",
      lastName: "Braun",
      avatar: "https://i.pravatar.cc/150?img=11",
      email: "webmaster@your-d-sign.de",
      password: "Start$2017",
      role: "admin",
      companyId: 1,
    },
    {
      firstName: "John",
      lastName: "Doe",
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "john@doe.com",
      password: "12345678",
      role: "moderator",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      avatar: "https://i.pravatar.cc/150?img=2",
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
    {
      UserId: 2,
      SkillId: 1,
    },
    {
      UserId: 3,
      SkillId: 2,
    },
  ];

  const projects = [
    {
      title: "Project A",
      description: "lorem ipsum dolor sit amet...",
      ownerId: 1,
    },
    {
      title: "Project B",
      description: "lorem ipsum dolor sit amet...",
      ownerId: 2,
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

  const comments = [
    {
      parent: "projects",
      parentId: 1,
      ownerId: 1,
      text: "Comment on project 1: lorem ipsum dolor sit amet...",
    },
    {
      parent: "projects",
      parentId: 1,
      ownerId: 2,
      text: "Comment on project 1: lorem ipsum dolor sit amet...",
    },
    {
      parent: "projects",
      parentId: 2,
      ownerId: 2,
      text: "Comment on project 2: lorem ipsum dolor sit amet...",
    },
    {
      parent: "companies",
      parentId: 1,
      ownerId: 2,
      text: "Comment on company 1: lorem ipsum dolor sit amet...",
    },
    {
      parent: "companies",
      parentId: 2,
      ownerId: 2,
      text: "Comment on company 2: lorem ipsum dolor sit amet...",
    },
    {
      parent: "jobs",
      parentId: 1,
      ownerId: 2,
      text: "Comment on job 1: lorem ipsum dolor sit amet...",
    },
  ];

  await User.bulkCreate(users, { individualHooks: true });
  await Company.bulkCreate(companies, { individualHooks: true });
  await Job.bulkCreate(jobs, { individualHooks: true });
  await Skill.bulkCreate(skills, { individualHooks: true });
  await BridgeUserSkill.bulkCreate(bus, { individualHooks: true });
  await Project.bulkCreate(projects, { individualHooks: true });
  await BridgeProjectSkill.bulkCreate(bps, { individualHooks: true });
  await Comment.bulkCreate(comments, { individualHooks: true });
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
