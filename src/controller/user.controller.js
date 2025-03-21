import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/api.response.js";
import AppStatusCode from "../constants/app.statuscode.js";
import { auth } from "../db/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase-admin";
import AppConstants from "../constants/app.constants.js";
import cookieOptions from "../constants/cookie.options.js";
import ErrorResponse from "../utils/error.response.js";

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body; // destructring the request body to extract email and password entered by the user

    if (!email || !password) {
        return res.status(AppStatusCode.badRequestCode).json(
            new ApiResponse(
                AppStatusCode.badRequestCode,
                "Email and password are required",
                null,
                false,
            )
        );
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
    };
    userData.token = await user.getIdToken();

    return res.status(AppStatusCode.sucessCode)
        .cookie(AppConstants.tokenKey, userData.token, cookieOptions)
        .json(
            new ApiResponse(
                AppStatusCode.sucessCode,
                "Login successful",
                userData
            )
        );
});


const signupUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(AppStatusCode.badRequestCode).json(
            new ErrorResponse(
                AppStatusCode.badRequestCode,
                "Email or Password cannot be empty"
            )
        );
    }
    else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userData = {
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            uid: user.uid,
        }
        userData.token = await user.getIdToken();
        res.status(AppStatusCode.sucessCode).json(
            new ApiResponse(
                AppConstants.sucessCode,
                "Signup sucessful",
                userData
            )
        );
    }
})


export {
    loginUser,
    signupUser,
}