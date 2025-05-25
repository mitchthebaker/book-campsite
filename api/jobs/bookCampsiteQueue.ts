import { Queue } from "bullmq";
import { redisConnection } from "~/config/redisConnection";

export const bookCampsiteQueue = new Queue('book-campsite', { connection: redisConnection });