/*
* Node.js, Express, Mongoose &c. notes API
* node-model.js
* mongoose model for note items
*/

// require mongoose module
var mongoose = require('mongoose');

var currentDate = new Date().getTime();

// specify model for note item
var Note = mongoose.model('Note', {
  text: {
    type: String,
    required: true, // text property required to create a new note item
    minLength: 1, // note item must have at least one character
    trim: true // removes any leading or trailing spaces
  },
  createdAt: {
    type: Number,
    default: currentDate
  },
  updatedAt: {
    type: Number,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// module export
module.exports = {
  Note //ES6 shortcut for Note: Note
};
