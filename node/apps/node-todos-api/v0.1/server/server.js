/*
  Node.js, MongoDB, and Mongoose Todo app - v0.1
  - server.js
  - require Mongoose and connect to MongoDB
  - define model and save document
  - add validators for model properties
*/

// require Mongoose
var mongoose = require('mongoose');

// specify preferred Promise library
mongoose.Promise = global.Promise;
//connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/NodeTodoApp');

// specify model for Todo item
var Todo = mongoose.model('Todo', {
  // specify requirements for a property of a todo item
  text: {
    type: String,
    required: true, // text property is required to create a new document
    minlength: 1, // todo item must have at least 1 character
    trim: true // removes leading and trailing spaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// create a new Todo item from the model
var todoItem = new Todo({
  text: '  visit Machu Pichu   ',
  completed: false,
  completedAt: 250717
});

// save the object as a document in the DB - save returns a promise
todoItem.save().then((doc) => {
  console.log('todo item saved', doc);
}, (error) => {
  console.log('todo item not saved: ', error);
});
