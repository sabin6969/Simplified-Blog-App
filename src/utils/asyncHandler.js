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
                    statusCode = 404;
                    message = "User not found or invalid credentials";
                    break;
                case 'auth/wrong-password':
                    statusCode = 401;
                    message = "Incorrect password";
                    break;
                case 'auth/invalid-email':
                    statusCode = 400;
                    message = "Invalid email format";
                    break;
                case 'auth/too-many-requests':
                    statusCode = 429;
                    message = "Too many login attempts. Please try again later";
                    break;
                default:
                    break;
            }
        }
        res.status(statusCode).json(new ErrorResponse(statusCode, message));
    }
}

export default asyncHandler;