import AppConstants from "../constants/app.constants.js";
import AppStatusCode from "../constants/app.statuscode.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/error.response.js";
import admin from "../db/firebase.admin.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies[AppConstants.tokenKey];
    if (!token) {
        throw new ErrorResponse(AppStatusCode.unauthorizedCode, "Unauthorized request", undefined);
    }
    else {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
});

export default authMiddleware;