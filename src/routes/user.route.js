import { Router } from "express";
import { loginUser, signupUser } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/signup").post(signupUser);

export default userRouter;