import { Worker } from 'bullmq'
import { queueName } from '../queues/assignmentqueue.js'
import { redisConnection } from '../config/redis.js'

const worker = new Worker(
    queueName,
    async(job) => {
        console.log("job is hoying",job.data)
    },
    {
        connection : redisConnection,
        concurrency : 10
    }
);

worker.on("completed", (job) => console.log(`Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`Job ${job?.id} failed:`, err));
