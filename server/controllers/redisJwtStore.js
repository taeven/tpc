var RedisClient = require('../config/redis');

function storeJwtToRedis(key, expiryTime, username){
    RedisClient.setex(key, expiryTime, username, function(err, reply){
        return err;
    });
}

module.exports = storeJwtToRedis;