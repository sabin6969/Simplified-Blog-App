import mongoose from "mongoose";
import AppConstants from "../constants/app.constants.js";
import AppStatusCode from "../constants/app.statuscode.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/error.response.js";
import Blog from "../models/blog.model.js";

const authorizationMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies[AppConstants.tokenKey];
    if (!token) {
        throw new ErrorResponse(
            AppStatusCode.unauthorizedCode,
            "Unauthorized request, token not found",
        );
    }
    else {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ErrorResponse(
                AppStatusCode.badRequestCode,
                `Blog id "${id}" is not valid!`
            )
        }
        else {
            const blog = await Blog.findById(id);
            if (blog) {
                // forbidden the user whose uid doesnot matches with author of particular blog post
                if (blog.author !== req.user.uid) {
                    throw new ErrorResponse(
                        AppStatusCode.forbiddenCode,
                        `Forbidden request!. Couldnot perform ${req.method} method on ${req.path} in a blog with id "${id}"`
                    )
                }
                next();
            }
            else {
                throw new ErrorResponse(
                    AppStatusCode.notFoundStatusCode,
                    `Blog post with id "${id}" doesnot exits`
                )
            }
        }
    }
});

export default authorizationMiddleware;