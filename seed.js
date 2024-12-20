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
      text: "Answer to question 1: I haven't got the slightest clue...",
    },
    {
      parent: "questions",
      parentId: 2,
      ownerId: 2,
      text: "Answer to question 2: there is a solution for your problem, but I don't have it...",
    },
  ];

  const questions = [
    {
      title:"What are best practices for state management in React?",
      description:"What are the best practices for managing state in a full-stack web application using React, Redux, and Context API to ensure maintainable and efficient code that can scale for larger applications with multiple components interacting dynamically?",
      ownerId:1
    },
    {
      title:"How to integrate JWT authentication with Express.js backend?",
      description:"How can I implement JSON Web Token (JWT) authentication and authorization in a full-stack project using Node.js, Express.js for the backend, and React for the frontend, ensuring secure login sessions and protecting user data from unauthorized access?",
      ownerId:2
    },
    {
      title:"How to optimize performance in MongoDB-based full-stack apps?",
      description:"What are the performance optimization techniques for a full-stack project using MongoDB as the primary database, including indexing, query optimization, and managing large datasets to improve application speed, response time, and overall scalability for growing user demands?",
      ownerId:3
    },
    {
      title:"What tools help with testing in full-stack JavaScript projects?",
      description:"What are the most effective tools and libraries for automated testing in full-stack JavaScript projects, such as Jest, Mocha, and Cypress, and how can these be integrated to ensure thorough unit testing, integration testing, and end-to-end testing for both front-end and back-end components?",
      ownerId:1
    },
    {
      title:"How to structure microservices in a full-stack web app?",
      description:"How do I design and structure a microservices architecture in a full-stack web application, ensuring each service is independently deployable, scalable, and fault-tolerant, while maintaining communication between services using REST APIs or messaging queues for efficient operations and scaling?",
      ownerId:2
    },
    {
      title:"How do I ensure security in full-stack web applications?",
      description:"What are the key security best practices to follow in a full-stack web application, including protecting against SQL injection, cross-site scripting (XSS), cross-site request forgery (CSRF), and securing sensitive data with encryption while ensuring proper user authentication and authorization layers are in place?",
      ownerId:3
    },
    {
      title:"How can I scale a full-stack app with Docker?",
      description:"What are the steps involved in scaling a full-stack web application using Docker containers, including setting up Docker Compose for multiple services, configuring scalability, and deploying across environments like AWS or Kubernetes to improve flexibility, fault tolerance, and performance?",
      ownerId:1
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
