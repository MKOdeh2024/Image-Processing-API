import express, { Application, Request, Response } from 'express';
import imageRouter from './routes/image.js';

const app: Application = express();
const port = 3000;

// Middleware to parse JSON if needed in future
app.use(express.json());

// Register image processing routes
app.use('/api/images', imageRouter);

// Basic root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Image Processing API is running');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
