import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import goodsRoutes from './routes/goodsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(goodsRoutes);
app.use(categoriesRoutes);
app.use(ordersRoutes);
app.use(feedbackRoutes);
app.use(subscriptionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
