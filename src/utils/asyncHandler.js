import ErrorResponse from "./error.response";

const asyncHandler = (callBackFunction) => async (req, res, next) => {
    try {
        await callBackFunction();
    } catch (error) {
        res.status(error.statusCode || 500).json(new ErrorResponse(error.statusCode, error.message || "Internal server error"));
    }
}

export default asyncHandler;