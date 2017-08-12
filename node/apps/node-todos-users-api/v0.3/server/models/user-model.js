/*
  Node.js, MongoDB, and Mongoose Todo app - users
  - v0.3
  - user-model.js
  - mongoose model for users
*/

// require mongoose module - not custom mongoose config file
const mongoose = require('mongoose');
// require validator module
const validator = require('validator');
// require npm module - json web token - jwt
const jwt = require('jsonwebtoken');
// require npm module - lodash
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true, // checks that email is unique in current system
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minlength: 6 // min length for user password
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
});

// add custom method to limit user object properties - will not show tokens &c. to user in response
UserSchema.methods.toJSON = function () {
  var user = this;
  // take mongoose object and convert to regular object - only properties from user object will exist
  var userObject = user.toObject();
  // return specific user object properties - use pick method from lodash
  return _.pick(userObject, ['_id', 'email']); // only return id and email for a user object...
};

// add custom method to UserSchema objects - needs standard function syntax to provide `this` keyword
UserSchema.methods.generateAuthToken = function () {
  var user = this; // provides access to a document - the document this method was called against...
  // get access value from tokens in schema
  var access = 'auth';
  // create token for user from schema
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'salted').toString(); // temporary secret value
  // update tokens array in schema - user will now be generated with the created token values...
  user.tokens.push({access, token});
  // save user - returns promise in server.js where it will be called and used...
  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('User', UserSchema);

// module export
module.exports = {
  User // ES6 shortcut for User: User
};
