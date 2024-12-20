import express from "express";
import {
  deleteOne,
  findAll,
  findOneById,
  register,
  updateOne,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateUser } from "../middlewares/validateRequest.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, paginationMiddleware, findAll)
  .post(validateUser, register);
router
  .route("/:id")
  .get(authenticate, findOneById)
  .put(authenticate, validateRequest, updateOne)
  .delete(authenticate, deleteOne);

export default router;
