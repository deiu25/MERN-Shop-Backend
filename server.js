const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });
const cloudinary = require('cloudinary');
const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console()
    ],
});

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    logger.error(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1)
})

// Setting up config file
dotenv.config({ path: 'config/config.env' });

// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    logger.error(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    // Close server & exit process
    server.close(() => {
        process.exit(1)
    })
})