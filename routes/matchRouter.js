import express from "express";
import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";
import {
  getJobsMatchingToUserId,
  getProjectsMatchingToUser,
  getUsersMatchingToJobId,
  getUsersMatchingToProject,
} from "../controllers/matchController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router
  .route("/users/jobs/:jobId")
  .get(authenticate, paginationMiddleware, getUsersMatchingToJobId); // find users fitting to a job

router
  .route("/jobs/users/:userId")
  .get(authenticate, paginationMiddleware, getJobsMatchingToUserId); // find users fitting to a job

router
  .route("/users/projects/:projectId")
  .get(authenticate, paginationMiddleware, getUsersMatchingToProject); // find users fitting to a job

router
  .route("/projects/users/:userId")
  .get(authenticate, paginationMiddleware, getProjectsMatchingToUser); // find users fitting to a job


export default router;
