import { Worker } from 'bullmq'
import { Assignment } from '../models/assessment_models.js';
import { queueName } from '../queues/assignmentqueue.js'
import { redisConnection } from '../config/redis.js'
import { connectDB } from '../config/db.js';
import { generate } from '../test/ai-test.js';
import { Redis } from 'ioredis'
import { REDIS_PUBLIC_URL } from '../config/env.js';
import express from "express";


const redisPub = new Redis(REDIS_PUBLIC_URL!);

const app = express();
app.get("/", (_, res) => res.send("Worker running"));
app.listen(process.env.PORT || 10000, () => {
  console.log("Health server running");
});

await connectDB();

const worker = new Worker(
  queueName,
  async (job) => {
    const { assignmentId } = job.data;
    console.log("Working on job", assignmentId);

    await Assignment.findByIdAndUpdate(assignmentId, { status: "processing" });
    await redisPub.publish("assignment:updates", JSON.stringify({
      assignmentId,
      status: "processing"
    }));

    await generate(assignmentId);

    await redisPub.publish("assignment:updates", JSON.stringify({
      assignmentId,
      status: "completed"
    }));

    console.log("Job completed:", assignmentId);
  },
  {
    connection: redisConnection,
    concurrency: 10
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", async (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
  if (job?.data?.assignmentId) {
    await redisPub.publish("assignment:updates", JSON.stringify({
      assignmentId: job.data.assignmentId,
      status: "failed"
    }));
  }
});