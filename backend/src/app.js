import express from 'express';
import cors from 'cors';
import env from './config/env.js';
import v1Routes from './routes/v1/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors({
  origin: env.corsOrigin.split(','),
  credentials: true,
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', v1Routes);

// 404 Route handling
app.use(notFoundMiddleware);

// Global Error Handling Middleware
app.use(errorMiddleware);

export default app;
