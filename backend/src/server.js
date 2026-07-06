import app from './app.js';
import connectDb from './db/connect.js';
import env from './config/env.js';

const startServer = async () => {
  try {
    // 1. Connect to MongoDB before starting server
    await connectDb();
    console.log('MongoDB connection established');

    // 2. Start Express server
    const PORT = env.port || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
});

startServer();
