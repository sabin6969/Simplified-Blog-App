import mongoose from "mongoose";


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    } catch (error) {
        process.exit(1);
    }
}

export default connectDb;