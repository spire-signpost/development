/*
* Node.js, Express, Mongoose &c. notes API
* mongoose-config.js
* config and settings for Mongoose and MongoDB
*/


// require Mongoose
var mongoose = require('mongoose');

// specified preferred promise library
mongoose.Promise = global.Promise;

//connect to MongoDB using Mongoose - use mLab or local uri
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NodeNoteApp'); // process environment returns mLab uri

// module exports
module.exports = {
  mongoose // ES6 shortcut for mongoose: mongoose
};
