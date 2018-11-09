var redis = require('redis');

const config = require('./config');

var RedisClient = redis.createClient(
    config.redis.port,
    config.redis.host
);

module.exports = RedisClient;