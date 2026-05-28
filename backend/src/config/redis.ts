import { Redis } from "ioredis";
import { REDIS_PUBLIC_URL } from "./env.js";

export const redisConnection = new Redis(REDIS_PUBLIC_URL!, {
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("Redis connected");
});

redisConnection.on("error", (err) => {
  console.error("Redis error:", err);
});