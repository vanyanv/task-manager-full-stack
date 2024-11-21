import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app',
  jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key',
  env: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} environment variable is not set`);
  }
});
