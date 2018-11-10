const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  email: {type: String, required: true, index: {unique: true}, match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']},
  password: {type: String, required: true},
  roles: [{type: String}]
});

UserSchema.plugin(uniqueValidator, {message: 'username or email exists'});

module.exports = mongoose.model('User', UserSchema, 'users');
