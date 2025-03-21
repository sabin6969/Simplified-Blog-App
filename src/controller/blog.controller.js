import mongoose, { mongo } from "mongoose";
import AppStatusCode from "../constants/app.statuscode.js";
import Blog from "../models/blog.model.js";
import ApiResponse from "../utils/api.response.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/error.response.js";
import webSocketManager from "../utils/websocket.js";

const createBlogPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if ([title, content].some((e) => typeof e === "undefined" || e?.trim() === "")) {
        throw new ErrorResponse(AppStatusCode.badRequestCode, "Blog title and content both are required");
    }
    else {
        // .user property is injected inside the request object during the execution of middleware
        const user = req.user;
        const blog = await Blog.create({
            title,
            content,
            author: user.uid,
        });

        webSocketManager.broadcast({
            event: "newBlogPost",
            data: blog,
        });

        res
            .status(AppStatusCode.sucessCode)
            .json(new ApiResponse(
                AppStatusCode.sucessCode,
                "Blog post created sucessful",
                blog
            )
            )
    }
})

const allPosts = asyncHandler(async (req, res, next) => {
    const blogs = await Blog.find();
    res
        .status(AppStatusCode.sucessCode)
        .json(
            new ApiResponse(
                AppStatusCode.sucessCode,
                "Got all blog posts",
                blogs,
            )
        )
});

const blogPostById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        throw new ErrorResponse(AppStatusCode.badRequestCode, "Unable to find blog id");
    }
    else if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorResponse(
            AppStatusCode.badRequestCode,
            `Blog id "${id}" is invalid`,
        );
    }
    else {
        const blog = await Blog.findById(id);
        if (blog) {
            res
                .status(AppStatusCode.sucessCode)
                .json(
                    new ApiResponse(
                        AppStatusCode.sucessCode,
                        `Got blog details with id ${id}`,
                        blog,
                    )
                )
        }
        else {
            throw new ErrorResponse(
                AppStatusCode.notFoundStatusCode,
                `Blog post with id "${id}" doesnot exits`
            );
        }
    }
})

const deleteBlogById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    res
        .status(AppStatusCode.sucessCode)
        .json(
            new ApiResponse(
                AppStatusCode.sucessCode,
                `Sucessfully delete blog with id "${id}"`,
                null,
            )
        );
})

const updateBlogById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if ([title, content].every((e) => typeof e === "undefined" || e?.trim() === "")) {
        throw new ErrorResponse(
            AppStatusCode.badRequestCode,
            `Both title and content cannot be empty`
        );
    }
    else {
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title,
            content,
        }, { new: true });
        res
            .status(AppStatusCode.sucessCode)
            .json(
                new ApiResponse(
                    AppStatusCode.sucessCode,
                    `Sucessfully updated blog with id "${id}"`,
                    updatedBlog,
                )
            )
    }
})

export {
    createBlogPost,
    allPosts,
    blogPostById,
    deleteBlogById,
    updateBlogById,
}