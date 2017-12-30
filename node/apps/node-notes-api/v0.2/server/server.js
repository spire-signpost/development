/*
* Node.js, Express, Mongoose &c. notes API
* server.js
*/


/*
* require modules for app
*/

// npm - require installed modules
// express web framework
var express = require('express');
// body-parser module
var bodyParser = require('body-parser');

// local - get mongoose property using ES6 destructuring - name of created local variable will match the property of the object
var {mongoose} = require('./dbms/mongoose-config.js'); // require custom mongoose config created for app
// note for model
var {Note} = require('./models/note-model.js');

// create express app
var app = express();

// configure middleware for body-parser
app.use(bodyParser.json());

// set port for server
app.listen(3030, () => {
  console.log('server started on port 3030...');
});

/*
* API routes
*/

// 1. POST route for note
app.post('/notes', (req, res) => {
  // create note item from model
  var note = new Note({
    text: req.body.text // specify text for each note item
  });

  note.save().then((doc) => {
    res.send(doc); // send back saved document details
  }, (error) => {
    // send back errors...
    res.status(400).send(error); // send back error and status code for request...
  })
});
