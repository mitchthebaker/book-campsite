import { Router, Request, Response } from 'express';
import healthRouter from './health';
import bookCampsiteRouter from './book-campsite';

const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/book-campsite', bookCampsiteRouter);

apiRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Welcome to the API!',
    data: null,
  });
});

apiRouter.get('/health', healthRouter);
apiRouter.get('/book-campsite', bookCampsiteRouter);

export default apiRouter;