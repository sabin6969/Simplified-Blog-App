import express from "express";
import userRoute from "../routes/user.route.js";
import AppStatusCode from "../constants/app.statuscode.js";
import ApiResponse from "../utils/api.response.js";

const expressApp = express();


// app level middleware
expressApp.use(express.json({ limit: "16kb" }))

// mapping the routes to expressApp
expressApp.use("/api/user", userRoute);


// catch all route 
expressApp.use((req, res) => {
    res.status(AppStatusCode.notFoundStatusCode).json(new ApiResponse(AppStatusCode.notFoundStatusCode, `${req.path} doesnot exists in this server`, null, false));
});


export default expressApp;