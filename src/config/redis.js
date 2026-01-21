const { createClient } = require('redis');
require('dotenv').config();

let redisClient;

// This logic makes your app work everywhere.
if (process.env.NODE_ENV === 'production') {
  // Production configuration: Use host, port, and password from Vercel env vars.
  console.log('Attempting to connect to Redis Cloud...');
  redisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  });
} else {
  // Development configuration: Connect to local Redis instance.
  console.log('Attempting to connect to local Redis...');
  redisClient = createClient({
    // This will connect to localhost:6379. Add your local password if you have one.
    password: process.env.REDIS_PASS
  });
}

redisClient.on('error', err => console.error('REDIS CLIENT ERROR:', err));
redisClient.on('connect', () => console.log('Successfully connected to Redis.'));

module.exports = redisClient;