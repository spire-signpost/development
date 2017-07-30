/*
  Node.js, MongoDB, and Mongoose Todo app - v0.2
  - server.js
  - express server routes...
*/

/*
  require modules
*/

// npm - require installed modules
// express web framework
var express = require('express');
// body-parser module
var bodyParser = require('body-parser');

// local - get mongoose property using ES6 destructuring - name of created local variable will match the property of the object
var {mongoose} = require('./dbms/mongoose-config.js'); // require custom mongoose config created for app
// Todo property for model
var {Todo} = require('./models/todo-model.js');
// User propertu for model
var {User} = require('./models/user-model.js');

// create express app
var app = express();

// configure middleware for body-parser
app.use(bodyParser.json());

/*
  API routes
*/
// POST route for todo items
app.post('/todos', (req, res) => { // route url for all todo items - use for post and get...
  // create todo item from model
  var todo = new Todo({
    text: req.body.text // specify text for each todo item
  });

  todo.save().then((doc) => {
    res.send(doc); // send back to the saved document details
  }, (error) => {
    // send back errors...
    res.status(400).send(error); // send back error and status code for request...
  })
});

// set port for server
app.listen(3030, () => {
  console.log('server started on port 3030...');
});
