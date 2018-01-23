/*
* Node.js, Express, Mongoose &c. notes API - v0.0.1
* server.js
*/

// require mongoose
var mongoose = require('mongoose');

// specified preferred promise library
mongoose.Promise = global.Promise;
//connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/NodeNoteApp');

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
    default: null
  }
});

// create a new Todo item from the model
var noteItem = new Note({
  text: 'a test note for Node-notes-api app...',
  createdAt: 281217
});

// save the object as a document in the DB - save returns a promise
noteItem.save().then((doc) => {
  console.log('note item saved', doc);
}, (error) => {
  console.log('note item not saved: ', error);
});
