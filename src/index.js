import dotenv from "dotenv";
import expressApp from "./app/app.js";
import connectDb from "./db/index.js";
import { firebaseApp } from "./db/firebase.js";


// configuring the environment variable
dotenv.config({ path: ".env" })


connectDb().then((value) => {
    expressApp.listen(process.env.port || 5000, () => {
        console.log(`Server is up and running at Port number ${process.env.port || 5000}`);
    });
}).catch(console.error);