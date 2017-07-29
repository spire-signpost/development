/*
  Node.js, MongoDB, and Mongoose Todo app - v0.8
  - mongoose-config.js
  - config and connect
*/

// require Mongoose
var mongoose = require('mongoose');

// specify preferred Promise library
mongoose.Promise = global.Promise;
//connect to MongoDB using Mongoose - use mLab or local uri
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NodeTodoApp'); // process environment returns mLab uri


// module exports
module.exports = {
  mongoose // ES6 shortcut for mongoose: mongoose
};
