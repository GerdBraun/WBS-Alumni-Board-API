import express from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";

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

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

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
