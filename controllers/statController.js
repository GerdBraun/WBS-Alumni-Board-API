import { Comment, Job, Project, Question, Skill, User } from "../db.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export const getStats = asyncWrapper(async (req, res, next) => {
  const users = await User.count();
  const skills = await Skill.count();
  const projects = await Project.count();
  const commentsOnProjects = await Comment.count({
    where: { parent: "projects" },
  });
  const jobs = await Job.count();
  const commentsOnJobs = await Comment.count({
    where: { parent: "jobs" },
  });
  const questions = await Question.count();
  const answersToQuestions = await Comment.count({
    where: { parent: "questions" },
  });
  res.json({ users, skills, projects, commentsOnProjects, jobs, commentsOnJobs, questions, answersToQuestions });
});
