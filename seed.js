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
  BridgeJobSkill,
  Question,
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
      title: "PixelForge Studio",
      description: "A creative full-stack platform for designing, storing, and sharing digital art portfolios with interactive features.",
      ownerId: 1
    },
    {
      title: "CodeLink Hub",
      description: "A collaborative coding platform combining real-time editing, project management, and user authentication for seamless team workflows.",
      ownerId: 2
    },
    {
      title: "EventSphere Pro",
      description: "Event management system integrating booking, scheduling, and payment processing for hosting seamless virtual and physical events.",
      ownerId: 3
    },
    {
      title: "ShopNestify",
      description: "Full-stack e-commerce platform offering customizable storefronts, secure payment gateways, and dynamic product management tools.",
      ownerId: 1
    },
    {
      title: "TravelSync Planner",
      description: "A travel coordination app that synchronizes itineraries, bookings, and trip budgeting across users for seamless group travel.",
      ownerId: 2
    }
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

  const bjs = [
    {
      JobId: 1,
      SkillId: 1,
    },
    {
      JobId: 1,
      SkillId: 2,
    },
    {
      JobId: 2,
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
    {
      parent: "questions",
      parentId: 1,
      ownerId: 2,
      text: "Answer to question 1: I haven't got the slightest cue...",
    },
    {
      parent: "questions",
      parentId: 2,
      ownerId: 2,
      text: "Answer to question 1: there is a solution for your problem, but I don't have it...",
    },
  ];

  const questions = [
    {
      text: "What are the best practices for managing state in a full-stack web application with React and Node.js?",
      ownerId: 1
    },
    {
      text: "How can I integrate authentication and authorization in a full-stack project using JWT and Express.js?",
      ownerId: 2
    },
    {
      text: "What are the performance optimization strategies for a full-stack project using MongoDB as the database?",
      ownerId: 3
    },
    {
      text: "What tools can help with automated testing and deployment in a full-stack JavaScript project using React?",
      ownerId: 1
    },
    {
      text: "How do I ensure scalability and fault tolerance in a full-stack web application with microservices architecture?",
      ownerId: 2
    }
  ]

  await User.bulkCreate(users, { individualHooks: true });
  await Company.bulkCreate(companies, { individualHooks: true });
  await Job.bulkCreate(jobs, { individualHooks: true });
  await Skill.bulkCreate(skills, { individualHooks: true });
  await BridgeUserSkill.bulkCreate(bus, { individualHooks: true });
  await Project.bulkCreate(projects, { individualHooks: true });
  await BridgeProjectSkill.bulkCreate(bps, { individualHooks: true });
  await BridgeJobSkill.bulkCreate(bjs, { individualHooks: true });
  await Comment.bulkCreate(comments, { individualHooks: true });
  await Question.bulkCreate(questions, { individualHooks: true });
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
