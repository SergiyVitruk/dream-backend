import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import goodsRoutes from './routes/goodsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

import usersRoutes from './routes/usersRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.use(authRoutes);
app.use(usersRoutes);
app.use(goodsRoutes);
app.use(categoriesRoutes);
app.use(ordersRoutes);
app.use(feedbackRoutes);
app.use(subscriptionRoutes);

app.use(errors());

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
