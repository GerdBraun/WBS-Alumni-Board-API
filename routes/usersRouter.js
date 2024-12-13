import express from "express";
import { findAll, findOneById, register } from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateRequest.js";
import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";

const router = express.Router();

router.post("/", validateUser, register);
router.get("/", paginationMiddleware, findAll);
router.get("/:id", findOneById);

export default router;
