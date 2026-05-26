import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT
export const MONGO_DB_URL = process.env.MONGO_DB_URL
export const REDIS_HOST = process.env.REIDS_HOST
export const REDIS_PORT = process.env.REDIS_PORT
