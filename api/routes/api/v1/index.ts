import { Router } from "express";

import bookCampsiteRouter from './bookCampsite';
import healthRouter from './health';
import loginRouter from "./login";

const v1Router = Router();

v1Router.use('/book-campsite', bookCampsiteRouter);
v1Router.use('/health', healthRouter);
v1Router.use('/login', loginRouter)

export default v1Router;