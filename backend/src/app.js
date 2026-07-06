import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import v1Routes from './routes/v1/index.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: env.corsOrigin.split(','),
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', v1Routes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
