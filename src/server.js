import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middlewere/logger.js';
import { notFoundHandler } from './middlewere/notFoundHandler.js';
import { errorHandler } from './middlewere/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(logger);




app.use(notesRoutes);


//для незнайденого маршруту
app.use(notFoundHandler);
//для помилки
app.use(errorHandler);

//підключення бд
await connectMongoDB();

//слухач сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

