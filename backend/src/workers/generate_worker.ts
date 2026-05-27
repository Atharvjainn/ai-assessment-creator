import { Worker } from 'bullmq'
import { Assignment } from '../models/assessment_models.js';
import { queueName } from '../queues/assignmentqueue.js'
import { redisConnection } from '../config/redis.js'
import { connectDB } from '../config/db.js';
import { generate } from '../test/ai-test.js';

await connectDB()

const worker = new Worker(
    queueName,
    async(job) => {
        console.log("working on the job",job.data)
        await Assignment.findByIdAndUpdate(
            job.data.assignmentId,
            {
                status : "processing"
            }
        );
        await generate(job.data.assignmentId);
        console.log('Job Completed!!');
        
    },
    {
        connection : redisConnection,
        concurrency : 10
    }
);

worker.on("completed", (job) => console.log(`Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`Job ${job?.id} failed:`, err));
