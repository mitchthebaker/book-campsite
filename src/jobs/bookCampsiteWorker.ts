import { Worker, Job } from "bullmq";

import { redisConnection } from "~/config/redisConnection";

const worker = new Worker(
  "book-campsite",
  async (job: Job) => {
    // Your Playwright logic here
    console.log("Processing job:", job.id, job.data);
    return { success: true };
  },
  { connection: redisConnection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});