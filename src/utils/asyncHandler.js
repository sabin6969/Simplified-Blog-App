import ErrorResponse from "./error.response.js";

/**
 * 
 * @param {function} callBackFunction 
 * @returns 
 */
const asyncHandler = (callBackFunction) => async (req, res, next) => {
    try {
        await callBackFunction(req, res, next);
    } catch (error) {
        res.status(error.statusCode || 500).json(new ErrorResponse(error.statusCode, error.message || "Internal server error"));
    }
}

export default asyncHandler;