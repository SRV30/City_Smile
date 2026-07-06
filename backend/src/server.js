import app from './app.js';
import connectDb from './db/connect.js';
import env from './config/env.js';

const startServer = async () => {
  try {
    // Connect to Database
    await connectDb().catch(err => {
        console.error(`MongoDB Connection Failed: ${err.message}`);
        // In some cases you might want to exit, but for demonstration we can continue
        // process.exit(1);
    });

    const PORT = env.port || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running in ${env.nodeEnv} mode on port ${PORT}`);
    });

    // Handle server shutdown
    process.on('unhandledRejection', (err) => {
      console.log(`Error: ${err.message}`);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error(`Error during startup: ${error.message}`);
    process.exit(1);
  }
};

startServer();
