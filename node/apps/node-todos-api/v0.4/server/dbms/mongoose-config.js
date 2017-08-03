/*
  Node.js, MongoDB, and Mongoose Todo app - v0.4
  - mongoose-config.js
  - config and connect
*/

// require Mongoose
var mongoose = require('mongoose');

// specify preferred Promise library
mongoose.Promise = global.Promise;
//connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/NodeTodoApp');


// module exports
module.exports = {
  mongoose // ES6 shortcut for mongoose: mongoose
};
