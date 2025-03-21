import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.route.js";

// configuring the environment variable
dotenv.config({ path: "../.env" })


const myExpressApp = express();


// app level middlewares
myExpressApp.use(express.json({ limit: "16kb" })) // to parse the incomming json data


myExpressApp.use("/api/user", userRouter);



myExpressApp.listen(process.env.port || 5000, () => {
    console.log(`Server is up and running at ${process.env.port || 5000}`);
})
