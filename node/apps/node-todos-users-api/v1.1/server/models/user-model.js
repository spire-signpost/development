/*
  Node.js, MongoDB, and Mongoose Todo app - users
  - v1.1
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
// require npm module - bcrypt hashing and salting
const bcrypt = require('bcryptjs');

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
  var user = this;
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

// custom instance method - pass token to delete
UserSchema.methods.removeToken = function (token) {
  // lowercase `this` for instance method
  var user = this;

  // call update() on object to update - pass updates object
  return user.update({
    // specify what to `pull` from db - pull fro tokens array
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

// model method for token authentication - statics defines method as a models method
UserSchema.statics.findByToken = function (token) {
  // uppercase User for model method
  var User = this;
  // store decoded jwt values
  var decoded;

  // catch any errors for verify()
  try {
    decoded = jwt.verify(token, 'salted'); // pass token to verify plus secret phrase for salting...

  } catch (error) {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  // return promise to query (i.e. in server.js) for requested user values
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token, //quotation marks required due to period in tokens.token
    'tokens.access': 'auth'
  });
};

// static for a model method - standard function call to use `this`
UserSchema.statics.findByCredentials = function (email, password) {
  // uppercase User for model method
  var User = this;
  // query db for user with passed email - then verify password...
  return User.findOne({email}).then((user) => {
    // check if user exists
    if (!user) {
      // reject the promise if no user exists
      return Promise.reject();
    }

    // return Promise for user found in db
    return new Promise((resolve, reject) => {
      // resolve Promise for user found...3 args expected
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // if response is sent for user
          resolve(user); // resolve the promise
        } else {
          // handle the error from the request
          reject() // reject the promise - sends a 400 status code
        }
      });
    });
  });
};

// run some code before the schema executes save...e.g. hash passwords before save
UserSchema.pre('save', function(next) {
  var user = this;
  // check if password is modified - if yes, then hash and salt is required
  if (user.isModified('password')) {
    // hash and salt password - before running save
    bcrypt.genSalt(10, (error, salt) => { // generate salt
      // hash password with salt
      bcrypt.hash(user.password, salt, (error, hash) => {
        // update user document with the hashed and salted password
        user.password = hash;
        // call next() to continue execution of schema - doc will be saved with hashed password...
        next();
      });
    });
  } else {
    // if not modified - continue schema execution
    next();
  }
});

var User = mongoose.model('User', UserSchema);

// module export
module.exports = {
  User // ES6 shortcut for User: User
};
