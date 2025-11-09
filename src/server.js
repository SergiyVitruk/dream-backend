import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import goodsRoutes from './routes/goodsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.use(goodsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
