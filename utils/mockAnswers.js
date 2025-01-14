// Desc: Mock answers for the chatbot
export const answers = {
  balance: {
    general:
      "A Fullstack Developer role typically involves a 40-hour workweek, with occasional flexibility for remote work or flexible hours. \nYou'll balance backend and frontend development tasks, collaborate with teams, and solve complex technical problems. \nWhile work can be demanding, especially near deadlines, companies that value work-life balance usually promote a healthy pace, encourage time off, and offer resources like mentorship or flexible schedules to ensure you maintain a good personal-professional equilibrium.",
    junior:
      "A Junior Fullstack Developer role typically involves a 40-hour workweek, with some flexibility in hours depending on the company. \nYou'll split your time between coding, debugging, and collaborating with senior developers, but the workload should generally be manageable.\n While occasional overtime may arise during tight project deadlines, junior roles tend to have lower stress levels than senior ones. \nA good work-life balance is achievable, especially in companies that promote flexible schedules and offer mentorship for growth.",
    senior:
      "A Senior Fullstack Developer role often involves a 40-50 hour workweek, with occasional overtime depending on project deadlines or team needs. \nWhile you'll take on more complex tasks, mentor juniors, and handle critical decisions, the workload can be demanding. \nSome flexibility may be offered in terms of hours or remote work. \nThe role may come with higher stress and responsibility, but companies prioritizing work-life balance typically offer support through flexible schedules, mental health resources, and time-off policies.",
    manager:
      "A Fullstack Development Manager role typically involves a 40-50 hour workweek, with some flexibility in hours depending on the company. \nYou'll oversee project timelines, mentor developers, and manage team dynamics, which can be demanding. \nThe role may require occasional overtime during critical project phases. \nWhile the workload can be stressful, companies that prioritize work-life balance offer support through flexible schedules, mental health resources, and time-off policies.",
  },
  requiredSkills: {
    general:
      "A Fullstack Developer typically needs a mix of frontend and backend skills, including proficiency in languages like JavaScript, HTML, and CSS. \nYou'll also need experience with frameworks like React, Angular, or Vue for frontend development, and Node.js, Django, or Ruby on Rails for backend work. \nProficiency in databases like SQL or MongoDB is essential, along with knowledge of version control systems like Git. \nSoft skills like problem-solving, teamwork, and communication are also important for success in this role.",
  },
};

export const getMockAnswers = (question) => {
    const message = question.toLowerCase();
  if (!message || !message.length) {
    return null;
  }
  if (message.includes("balance")) {
    if (message.includes("junior")) {
      return answers.balance.junior;
    }
    if (message.includes("senior")) {
      return answers.balance.senior;
    }
    if (message.includes("manager")) {
      return answers.balance.manager;
    }
    return answers.balance.general;
  }

  if (message.includes("skills")) {
    return answers.requiredSkills.general;
  }

  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
};
