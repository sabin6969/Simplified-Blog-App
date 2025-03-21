import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/api.response.js";
import AppStatusCode from "../constants/app.statuscode.js";


const loginUser = asyncHandler((req, res, next) => {
    res.status(AppStatusCode.sucessCode).json(new ApiResponse(AppStatusCode.sucessCode, "Login controller Called!", {}));
});


const signupUser = asyncHandler((req, res, next) => {
    res.status(AppStatusCode.sucessCode).json(new ApiResponse(AppStatusCode.sucessCode, "Signup controller called!", {}));
})


export {
    loginUser,
    signupUser,
}