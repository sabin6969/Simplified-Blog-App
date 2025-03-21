import AppStatusCode from "../constants/app.statuscode.js";
import Blog from "../models/blog.model.js";
import ApiResponse from "../utils/api.response.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/error.response.js";


const createBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if ([title, content].some((e) => typeof e === "undefined" || e?.trim() === "")) {
        throw new ErrorResponse(AppStatusCode.badRequestCode, "Blog title and content both are required");
    }
    else {
        // .user property is injected inside request object inside the middleware
        const user = req.user;
        const blog = await Blog.create({
            title,
            content,
            author: user.uid,
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

export {
    createBlog,
}