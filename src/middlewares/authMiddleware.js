import admin from "firebase-admin";
import AppConstants from "../constants/app.constants.js";
import AppStatusCode from "../constants/app.statuscode.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/error.response.js";
import Path from "path";
import { cert } from "firebase-admin/app";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies[AppConstants.tokenKey];
    if (!token) {
        throw new ErrorResponse(AppStatusCode.unauthorizedCode, "Token not found", undefined);
    }
    else {
        admin.initializeApp({
            credential: cert(Path.join("src/simplified-blog-app-firebase-adminsdk-fbsvc-0577a28f1f.json"))
        })
        const decodedToken = await admin.auth().verifyIdToken(token);
        next();
    }
});

export default authMiddleware;