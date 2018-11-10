var config = require('../config/config');
var RedisClient = require('../config/redis');
var jwt = require('jsonwebtoken');

function checkLogin(req, res, next){
    var cookies = req.cookies;

    var username = '';
    jwt.verify(cookies.token, config.jwtSecret, function(err, payload){
        if(err) {
            res.locals.tokenError = 'Invalid token';
            return next();
        }
        username = payload.username;
        RedisClient.get(cookies.token, function(err, reply){
            if(!reply){
                res.locals.tokenError = 'Invalid token';
                return next();
            }
            res.locals.tokenError = 'valid token exists';
            res.locals.username = username;
            return next();
        });
    });
}

module.exports = checkLogin;