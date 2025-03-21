import { Router } from "express";
import { loginUser, signupUser } from "../controller/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(signupUser);

export default userRouter;