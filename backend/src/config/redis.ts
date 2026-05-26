import { Redis } from "ioredis";
import { REDIS_HOST,REDIS_PORT } from "./env.js";


export const redisConnection = new Redis({
  host: REDIS_HOST ?? "localhost",
  port: Number(REDIS_PORT ?? 6379),
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => console.log("Redis connected"));
redisConnection.on("error", (err) => console.error("Redis error:", err));