function validateUser(req, res, next){
    req.check('username')
    .custom(value => !/\s/.test(value))
    .withMessage('No spaces are allowed in the username');

    req.check('username').isLength({min: 3}).trim().withMessage('username length should be at least 3');

    req.check('email').isEmail();

    req.check('password').isLength({min: 4}).withMessage('password length should be at least 4')

    var errors = null;
    errors = req.validationErrors();

    if(errors)  return res.status(422).send(errors);
    
    next();
}

module.exports = validateUser;