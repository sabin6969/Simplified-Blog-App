import dotenv from "dotenv";
import expressApp from "./app/app.js";
import connectDb from "./db/index.js";
import http from "http";
import webSocketManager from "./utils/websocket.js";


// configuring the environment variable
dotenv.config({ path: ".env" })


connectDb().then((value) => {
    const server = expressApp.listen(process.env.port || 5000, () => {
        console.log(`Server is up and running at Port number ${process.env.port || 5000}`);
    });
    webSocketManager.initialize(server);
}).catch(console.error);