/*
  Node.js, MongoDB, and Mongoose Todo app - users
  - v0.2
  - user-model.js
  - mongoose model for users
*/

// require mongoose module - not custom mongoose config file
const mongoose = require('mongoose');
// require validator module
const validator = require('validator');

// specify model for user
var User = mongoose.model('User', {
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

// module export
module.exports = {
  User // ES6 shortcut for User: User
};
