import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});


app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({
    message: `'Retrieved note with ID: ${req.params.noteId}'`,
  });
});

app.get('/test-error', (req, res) => {
  throw new Error('Something went wrong');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    message: `${err.message}`,
  });
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

