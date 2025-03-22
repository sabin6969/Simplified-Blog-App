import express from "express";
import userRoute from "../routes/user.route.js";
import blogRoute from "../routes/blog.route.js";
import AppStatusCode from "../constants/app.statuscode.js";
import ApiResponse from "../utils/api.response.js";
import cookieParser from "cookie-parser";

const expressApp = express();


// app level middleware
expressApp.use(express.json({ limit: "16kb" }))
expressApp.use(cookieParser());

// mapping the routes to expressApp
expressApp.use("/api/auth", userRoute);
expressApp.use("/api", blogRoute);


// catch all route 
expressApp.use((req, res) => {
    res.status(AppStatusCode.notFoundStatusCode).json(
        new ApiResponse(AppStatusCode.notFoundStatusCode,
            `${req.method} method on ${req.path} doesnot exists in this server`,
            null,
            false
        )
    );
});

export default expressApp;