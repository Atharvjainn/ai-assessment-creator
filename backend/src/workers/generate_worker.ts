import { Worker } from 'bullmq'
import { Assignment } from '../models/assessment_models.js';
import { queueName } from '../queues/assignmentqueue.js'
import { redisConnection } from '../config/redis.js'
import { connectDB } from '../config/db.js';

await connectDB()

const worker = new Worker(
    queueName,
    async(job) => {
        console.log("working on the job",job.data)
        const assignment = await Assignment.findByIdAndUpdate(
            job.data.assignmentId,
            {
                status : "completed"
            }
        );
        
    },
    {
        connection : redisConnection,
        concurrency : 10
    }
);

worker.on("completed", (job) => console.log(`Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`Job ${job?.id} failed:`, err));
