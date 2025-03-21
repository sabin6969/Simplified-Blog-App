import { Router } from "express";
import { allPosts, blogPostById, createBlogPost } from "../controller/blog.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const blogRoute = Router();


// secured route (user has to be authenticated before reaching the actual controller)
blogRoute.route("/posts").post(authMiddleware, createBlogPost);
blogRoute.route("/posts").get(authMiddleware, allPosts);
blogRoute.route("/posts/:id").get(authMiddleware, blogPostById);

export default blogRoute;