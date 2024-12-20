import express from "express";
import { login, getProfile, register } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateUser } from "../middlewares/validateRequest.js";
import { recoverPw, resetPw } from "../controllers/resetPwController.js";

const authRouter = express.Router();

authRouter.post("/signup", validateUser, register);
authRouter.post("/login", validateUser, login);
authRouter.get("/profile", authenticate, getProfile);

authRouter.get("/recover-password", recoverPw);
authRouter.get("/reset-password", resetPw);

export default authRouter;
