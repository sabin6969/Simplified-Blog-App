import { Router } from "express";
import { allPosts, blogPostById, createBlogPost, deleteBlogById, updateBlogById } from "../controller/blog.controller.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js"

const blogRoute = Router();

// unsecured routes
blogRoute.route("/posts").get(allPosts);
blogRoute.route("/posts/:id").get(blogPostById);

// secured route (user has to be authenticated before reaching the actual controller)
blogRoute.route("/posts").post(authenticationMiddleware, createBlogPost);
blogRoute.route("/posts/:id").delete(authenticationMiddleware, authorizationMiddleware, deleteBlogById);
blogRoute.route("/posts/:id").patch(authenticationMiddleware, authorizationMiddleware, updateBlogById);

export default blogRoute;