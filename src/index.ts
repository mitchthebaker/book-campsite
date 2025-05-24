import express from 'express';
import dotenv from 'dotenv';

import apiRouter from '~/routes/api';
import { apiLimiter } from '~/middleware/rateLimiter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

app.use('/api', apiLimiter, apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
