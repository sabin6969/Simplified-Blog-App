import { Router } from "express";
import { allPosts, blogPostById, createBlogPost, deleteBlogById } from "../controller/blog.controller.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js"

const blogRoute = Router();


// secured route (user has to be authenticated before reaching the actual controller)
blogRoute.route("/posts").post(authenticationMiddleware, createBlogPost);
blogRoute.route("/posts").get(authenticationMiddleware, allPosts);
blogRoute.route("/posts/:id").get(authenticationMiddleware, blogPostById);
blogRoute.route("/posts/:id").delete(authenticationMiddleware, authorizationMiddleware, deleteBlogById);

export default blogRoute;