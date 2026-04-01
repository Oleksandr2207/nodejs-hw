import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(logger);




app.use(notesRoutes);

app.use(errors());

app.use(notFoundHandler);

app.use(errorHandler);



//підключення бд
await connectMongoDB();

//слухач сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

