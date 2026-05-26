import mongoose from "mongoose";
import { MONGO_DB_URL } from "./env.js";

export const connectDB = async() => {
    await mongoose.connect(MONGO_DB_URL!);
    console.log("DB Connected Successfully")
}