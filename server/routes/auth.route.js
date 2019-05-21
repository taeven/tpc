const express = require("express");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserValidator = require("../middleware/userValidator");
const CheckIfLogin = require("../middleware/checkIfLogin");
const StoreJwt = require("../controllers/redisJwtStore");
const DeleteJwt = require("../controllers/redisJwtDel");
const formatResponse = require("../controllers/formatResponse");

const router = express.Router();

router.post("/register", UserValidator, (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 12);

  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      roles: [req.body.roles]
    },
    function(err, user) {
      if (err) return res.status(500).send(err.message);
      return res.status(200).send(user.username + " registered successfully");
    }
  );
});

router.post("/login", CheckIfLogin, function(req, res) {
  // console.log(req);
  response = {};
  if (res.locals.tokenError !== "Invalid token") {
    response.status = 409;
    response.message = "already logged in as " + res.locals.username;
    res = formatResponse(res, response);
    // console.log(res);
    return res.status(200).send(res.response);
  }

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      response.status = 500;
      response.message = "some error";
      res = formatResponse(res, response);
      // console.log(res);
      return res.status(200).send(res.response);
    }
    if (!user) {
      response.status = 200;
      response.message = "Username does not exists";
      res = formatResponse(res, response);
      // console.log(res);
      return res.status(200).send(res.response);
    }
    var isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
      response.status = 401;
      response.message = "not authorized";
      res = formatResponse(res, response);
      // console.log(res);
      return res.status(200).send(res.response);
    }

    var token = jwt.sign({ username: user.username }, config.jwtSecret, {
      expiresIn: 86400
    });
    if (StoreJwt(token, 86400, user.username)) {
      response.status = 500;
      response.message = "some error occurred";
      res = formatResponse(res, response);
      // console.log(res);
      return res.status(200).send(res.response);
    }

    response.status = 200;
    response.message = "Logged in";
    response.username = req.body.username;
    response.token = token;
    res = formatResponse(res, response);
    // console.log(req);
    res.cookie("rememberme", "1", { expires: new Date(Date.now() + 900000) });
    res.cookie("token", token);
    return res.status(200).send(res.response);
  });
});

router.get("/me", CheckIfLogin, (req, res) => {
  response = {
    status: 401,
    message: "default"
  };

  if (res.locals.tokenError == "Invalid token") {
    res.clearCookie("token");
    response.status = 401;
    response.message = res.locals.tokenError;

    res = formatResponse(res, response);

    return res.status(200).send(res.response);
  }
  response.status = 200;
  response.username = res.locals.username;
  response.token = req.cookies.token;
  res = formatResponse(res, response);

  return res.status(200).send(res.response);
});

router.get("/logout", function(req, res) {
  response = {};
  if (req.cookies.token == null) {
    response.status = 200;
    response.message = "already logged out";
    res = formatResponse(res, response);
    return res.status(200).send(res.response);
  } else {
    if (DeleteJwt(req.cookies.token) == null) {
      response.status = 200;
      response.message = "logged out";
      res = formatResponse(res, response);
      res.clearCookie("token");
      return res.status(200).send(res.response);
    } else {
      res.clearCookie("token");
      response.status = 200;
      response.message = "some error occurred";
      res = formatResponse(res, response);
      return res.status(200).send(res.response);
    }
  }
});

module.exports = router;
