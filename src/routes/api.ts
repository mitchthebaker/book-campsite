import { Router, Request, Response } from 'express';

const apiRouter = Router();

// Example GET route: /api/
apiRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' });
});

// Example GET route: /api/health
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export default apiRouter;