import express from "express";
import { findOneById, register } from "../controllers/userController.js";
import { validateUser } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/", validateUser, register);
router.get("/:id", findOneById);

export default router;
