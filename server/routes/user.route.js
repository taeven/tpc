const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));


router.get('/testing',(req, res)=>{
  res.status(200)
  .send("asdfghjkl;");
});

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}
