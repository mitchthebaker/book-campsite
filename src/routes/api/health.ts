import { Router, Request, Response } from 'express';

const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'API is healthy',
    data: { status: 'ok' },
  });
});

export default healthRouter;