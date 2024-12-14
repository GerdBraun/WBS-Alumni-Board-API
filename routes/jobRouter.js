import express from "express";
import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";
import { createOne, deleteOne, findAll, findOneById, updateOne } from "../controllers/jobController.js";

const router = express.Router();

router.route("/")
.get(paginationMiddleware, findAll)
.post(createOne)

router.route("/:id")
.get(findOneById)
.put(updateOne)
.delete(deleteOne);

export default router;
