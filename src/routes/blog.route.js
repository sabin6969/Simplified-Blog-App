import { Router } from "express";
import { createBlog } from "../controller/blog.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const blogRoute = Router();


// secured route (user has to be authenticated before reaching the actual controller)
blogRoute.route("/createBlog").post(authMiddleware, createBlog);

export default blogRoute;