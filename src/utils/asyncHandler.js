import AppStatusCode from "../constants/app.statuscode.js";
import ErrorResponse from "./error.response.js";

/**
 * 
 * @param {function} callBackFunction 
 */
const asyncHandler = (callBackFunction) => async (req, res, next) => {
    try {
        await callBackFunction(req, res, next);
    } catch (error) {
        let statusCode = error.statusCode || 500;
        let message = error.message || "Internal Server Error";
        if (error.code) {
            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                    statusCode = AppStatusCode.notFoundStatusCode;
                    message = "User not found or invalid credentials";
                    break;
                case 'auth/wrong-password':
                    statusCode = AppStatusCode.unauthorizedCode;
                    message = "Incorrect password";
                    break;
                case 'auth/invalid-email':
                    statusCode = AppStatusCode.badRequestCode;
                    message = "Invalid email format";
                    break;
                case 'auth/too-many-requests':
                    statusCode = AppStatusCode.tooManyRequestCode;
                    message = "Too many login attempts. Please try again later";
                    break;
                case 'auth/email-already-in-use':
                    statusCode = AppStatusCode.conflictCode;
                    message = "Email is already in use";
                default:
                    break;
            }
        }
        res.status(statusCode).json(new ErrorResponse(statusCode, message, null));
    }
}

export default asyncHandler;