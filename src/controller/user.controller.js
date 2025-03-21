import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/api.response.js";
import AppStatusCode from "../constants/app.statuscode.js";
import { auth } from "../db/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";


const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body; // destructring the request body and extracting email and password entered by the user

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
        emailVerified: user.emailVerified
    };

    return res.status(AppStatusCode.sucessCode).json(
        new ApiResponse(
            AppStatusCode.sucessCode,
            "Login successful",
            userData
        )
    );
});


const signupUser = asyncHandler((req, res, next) => {
    res.status(AppStatusCode.sucessCode).json(new ApiResponse(AppStatusCode.sucessCode, "Signup controller called!", {}));
})


export {
    loginUser,
    signupUser,
}