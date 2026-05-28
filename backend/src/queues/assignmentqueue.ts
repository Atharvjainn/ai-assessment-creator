import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const queueName = "assignment-queue"

export const assignmentqueue = new Queue(
    queueName,
    {
        connection: redisConnection,
        defaultJobOptions: {
            attempts: 3,
            backoff: { type: "exponential", delay: 1000 },
            removeOnComplete: { count: 100 },
            removeOnFail: { count: 500 },
        },
    },
);