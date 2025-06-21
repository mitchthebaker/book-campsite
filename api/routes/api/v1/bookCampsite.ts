import { Router, Request, Response } from 'express'
import { bookCampsiteQueue } from '~/jobs/bookCampsiteQueue'

const bookCampsiteRouter = Router()

bookCampsiteRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { start = '0', limit = '20' } = req.query

    const parsedStart = parseInt(String(start), 10)
    const parsedLimit = parseInt(String(limit), 10)

    const [waiting, active, completed, failed, delayed] = await Promise.all([
      bookCampsiteQueue.getWaiting(),
      bookCampsiteQueue.getActive(),
      bookCampsiteQueue.getCompleted(parsedStart, parsedLimit),
      bookCampsiteQueue.getFailed(parsedStart, parsedLimit),
      bookCampsiteQueue.getDelayed(),
    ]);

    const data = {
      waiting: waiting.map((job) => job.asJSON()),
      active: active.map((job) => job.asJSON()),
      completed: completed.map((job) => job.asJSON()),
      failed: failed.map((job) => job.asJSON()),
      delayed: delayed.map((job) => job.asJSON()),
    }

    res.status(200).json({
      status: 'success',
      message: 'Book Campsite API is working',
      data,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve booking status',
      error: error instanceof Error ? error.message : String(error),
    })
  }
})

bookCampsiteRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { url, auth } = req.body
    const userId = req.auth?.sub

    if (!url) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Missing required field: url',
        data: null,
      })
    }

    const job = await bookCampsiteQueue.add('booking', { url, auth })
    console.log(job)

    const io = req.app.get('io')
    if (userId) {
      io.to(userId).emit('booking:created', {
        jobId: job.id,
        url, 
        auth,
        userId,
      })
    }

    res.status(202).json({
      status: 'accepted',
      statusCode: 202,
      message: 'Booking job enqueued',
      data: { jobId: job.id },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to enqueue booking job',
      error: error instanceof Error ? error.message : String(error),
    })
  }
})

bookCampsiteRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!id) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Missing required field: id',
        data: null,
      })
    }

    if (!status) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Missing required field: status',
        data: null,
      })
    }

    // Here you would typically update the job status in your database or job queue
    // For demonstration, we will just return a success response

    res.status(200).json({
      status: 'success',
      message: `Booking job ${id} updated to ${status}`,
      data: { jobId: id, status },
    })
  }
  catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update booking status',
      error: error instanceof Error ? error.message : String(error),
    })
  }
})

bookCampsiteRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Missing required field: id',
        data: null,
      })
    }

    // Here you would typically remove the job from your database or job queue
    // For demonstration, we will just return a success response

    res.status(200).json({
      status: 'success',
      message: `Booking job ${id} deleted`,
      data: { jobId: id },
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete booking job',
      error: error instanceof Error ? error.message : String(error),
    })
  }
})

export default bookCampsiteRouter
