import { Router } from "express";

import healthRouter from './health';
import bookCampsiteRouter from './bookCampsite';

const v1Router = Router();

v1Router.use('/health', healthRouter);
v1Router.use('/book-campsite', bookCampsiteRouter);

export default v1Router;