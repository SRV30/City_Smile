import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import apiRoutes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: env.corsOrigin.split(','),
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(errorHandler);

export default app;
