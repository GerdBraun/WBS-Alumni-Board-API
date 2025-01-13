import express from "express";
import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";
import { createOne, deleteOne, findAll, findOneById, updateOne } from "../controllers/projectController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.route("/")
.get(authenticate, paginationMiddleware, findAll)
.post(authenticate, createOne)

router.route("/:id")
.get(authenticate, findOneById)
.put(authenticate, updateOne)
.delete(authenticate, deleteOne);

export default router;
