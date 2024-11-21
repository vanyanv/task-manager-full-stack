import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config';

import todoRoutes from './routes/todoRoutes';

//express
const app = express();

//cors
app.use(cors());
app.use(express.json()); // <-- This is crucial for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));

//todo Routes
app.use('/api/todos', todoRoutes);

mongoose
  .connect(config.mongoUri)
  .then(() => console.log('Connected To MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
