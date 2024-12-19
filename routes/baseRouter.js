import express from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import skillRouter from "./skillRouter.js";
import jobRouter from "./jobRouter.js";
import projectRouter from "./projectRouter.js";
import matchRouter from "./matchRouter.js";

import { dynamicModelMiddleware } from "../middlewares/dynamicModel.js";
import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createOne,
  deleteOne,
  findAll,
  findOneById,
  updateOne,
} from "../controllers/CRUD.js";
import { findAllByModelAndId } from "../controllers/commentController.js";
import { getStats } from "../controllers/statController.js";
import { sendMail } from "../controllers/mailController.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/skills", skillRouter);
router.use("/jobs", jobRouter);
router.use("/projects", projectRouter);

router.use("/match", matchRouter);

router.route("/stats").get(getStats);
router.route("/mail").get(sendMail);

// uses the method from the commentController for finding 
router.use("/comments/:model/:id",paginationMiddleware, findAllByModelAndId);

router.use("/:model", dynamicModelMiddleware);

router
  .route("/:model")
  .get(paginationMiddleware, findAll)
  .post(authenticate, validateRequest, createOne);

router
.route("/:model/:id")
.get(findOneById)
  .put(authenticate, validateRequest, updateOne)
  .delete(authenticate, deleteOne);

export default router;
