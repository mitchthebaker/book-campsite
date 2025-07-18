import { Router, Request, Response } from 'express'

const healthRouter = Router()

healthRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'api/v1 is healthy',
    data: { status: 'ok' },
  })
})

export default healthRouter
