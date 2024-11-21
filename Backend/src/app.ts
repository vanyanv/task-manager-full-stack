import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';

//express
const app = express();
//cors
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connected To MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default app;
