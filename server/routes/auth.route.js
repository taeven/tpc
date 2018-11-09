const express = require('express');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const UserValidator = require('../middleware/userValidator');
const CheckAlreadyLogin = require('../middleware/checkAlreadyLogin');
const StoreJwt = require('../controllers/redisJwtStore');

const router = express.Router();

router.post('/register', UserValidator, (req, res) => {

    var hashedPassword = bcrypt.hashSync(req.body.password, 12);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        roles: [req.body.roles]
    },
    function(err, user){
        if(err) return res.status(500).send(err.message);
        return res.status(200).send(user.username + ' registered successfully');
    });
});

router.post('/login', CheckAlreadyLogin, function(req, res){
    if(res.locals.tokenError !== 'Invalid token'){
        return res.status(409).send('already logged in as '+res.locals.username);
    }

    User.findOne({username: req.body.username}, (err, user) => {
        if(err){
            return res.status(500).send('some error');
        }
        if(!user){
           return res.status(200).send('Username not exists');
        }
        var isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if(!isPasswordValid){
            return res.status(401).send('not authorized');
        }

        var token = jwt.sign({username: user.username}, config.jwtSecret, {expiresIn: 86400});
        if (StoreJwt(token, 86400, user.username)){
            return res.status(500).send('some error occurred');
        }
        res.cookie('token', token);
        return res.status(200).send('Logged in');
    });
});

router.get('/me', CheckAlreadyLogin, (req, res)=>{
    if(res.locals.tokenError == 'Invalid token'){
        res.clearCookie('token');
        return res.status(401).send(res.locals.tokenError);
    }
    return res.status(200).send(res.locals.username);
});

module.exports = router;