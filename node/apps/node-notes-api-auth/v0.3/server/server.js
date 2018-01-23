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
// ObjectID for validation
var {ObjectID} = require('mongodb');

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

// 2. GET route for notes
app.get('/notes', (req, res) => {
  Note.find().then((notes) => { // promised resolved with all of the notes from the db
    res.send({ // response - send data back from get route - all of the notes
      notes // add notes array to object - update and modify object as needed instead of just sending array response...
    });
  }, (error) => { // error callback if error with promise
    res.status(400).send(error); // send back error and status code for request...
  });
});

// 3. GET route for notes with parameter - then query DB for passed ID
app.get('/notes/:id', (req, res) => {
  // get params ID from req
  var params_id = req.params.id;
  console.log(params_id);

  // validate passed ID - check not valid
  if (!ObjectID.isValid(params_id)) {
    // return 404 status code for invalid ID
    return res.status(404).send();
  }

  // test find for GET route with params - e.g. ID
  Note.findById(params_id).then((note) => {
    // check if return data available
    if (!note) {
      return res.status(404).send();
    }

    // otherwise return the data for the params ID
    res.send({note}); // return note item in object - more flexible than default array return
  }).catch((error) => { // catch return errors for query
    res.status(400).send();
  });
});
