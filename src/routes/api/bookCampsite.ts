import { Router, Request, Response } from "express";
import { bookCampsiteQueue } from "~/jobs/bookCampsiteQueue";

const bookCampsiteRouter = Router();

bookCampsiteRouter.post("/", async (req: Request, res: Response) => {
  try {
    // require authentication middleware here if needed

    const job = await bookCampsiteQueue.add("book", req.body || {});
     
    res.status(202).json({
      status: "accepted",
      statusCode: 202,
      message: "Booking job enqueued",
      data: { jobId: job.id },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Failed to enqueue booking job",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default bookCampsiteRouter;