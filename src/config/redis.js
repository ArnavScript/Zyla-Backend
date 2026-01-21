// config/redis.js

const { createClient } = require('redis');
require('dotenv').config();

// This single configuration works for both local and production environments.
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', err => console.error('REDIS CLIENT ERROR:', err));
redisClient.on('connect', () => console.log('Successfully connected to Redis.'));

module.exports = redisClient;