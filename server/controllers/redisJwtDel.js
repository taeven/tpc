var RedisClient = require('../config/redis')

function delJwtFromRedis(token){
    RedisClient.del(token, function(err, reply){
        return err;
    });
}

module.exports = delJwtFromRedis;