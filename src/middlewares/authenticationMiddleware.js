import AppConstants from "../constants/app.constants.js";
import AppStatusCode from "../constants/app.statuscode.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/error.response.js";
import admin from "../db/firebase.admin.js";

const authenticationMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies[AppConstants.tokenKey];
    if (!token) {
        throw new ErrorResponse(AppStatusCode.unauthorizedCode, "Unauthorized request", undefined);
    }
    else {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        } catch (error) {
            throw new ErrorResponse(
                AppStatusCode.unauthorizedCode,
                `${error.message}`,
            )
        }
    }
});

export default authenticationMiddleware;