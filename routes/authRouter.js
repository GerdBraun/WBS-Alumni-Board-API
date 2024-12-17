import express from "express";
import { login, getProfile, register } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateUser } from "../middlewares/validateRequest.js";

const authRouter = express.Router();

authRouter.post("/signup", validateUser, register);
authRouter.post("/login", validateUser, login);
authRouter.get("/profile", authenticate, getProfile);


export default authRouter;
