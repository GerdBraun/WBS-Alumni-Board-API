import express from "express";
import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";
import {
  getJobsMatchingToUserId,
  getProjectsMatchingToUser,
  getUsersMatchingToJobId,
  getUsersMatchingToProject,
} from "../controllers/matchController.js";

const router = express.Router();

router
  .route("/users/jobs/:jobId")
  .get(paginationMiddleware, getUsersMatchingToJobId); // find users fitting to a job

router
  .route("/jobs/users/:userId")
  .get(paginationMiddleware, getJobsMatchingToUserId); // find users fitting to a job

router
  .route("/users/projects/:projectId")
  .get(paginationMiddleware, getUsersMatchingToProject); // find users fitting to a job

router
  .route("/projects/users/:userId")
  .get(paginationMiddleware, getProjectsMatchingToUser); // find users fitting to a job

// router.route("/users/projects/:id");

export default router;
