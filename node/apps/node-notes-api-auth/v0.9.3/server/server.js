/*
* Node.js, Express, Mongoose &c. notes API
* server.js
*/

/*
* require modules for app
*/

// npm - require installed modules
// lodash js library - utilities
const _ = require('lodash');
// express web framework
const express = require('express');
// body-parser module
const bodyParser = require('body-parser');
// ObjectID for validation
const {ObjectID} = require('mongodb');

// local - get mongoose property using ES6 destructuring - name of created local variable will match the property of the object
var {mongoose} = require('./dbms/mongoose-config.js'); // require custom mongoose config created for app
// note for model
var {Note} = require('./models/note-model.js');
// user for model
var {User} = require('./models/user-model.js');
// require authenticate from local module
var {authenticate} = require('./middleware/authenticate');

// create express app
var app = express();
// configure middleware for body-parser
app.use(bodyParser.json());

// environment port variable
const port = process.env.PORT || 3030;

// set port for server
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

/*
* API routes - NOTES
* POST, GET, DELETE, PATCH
*/

// 1. POST route for note
app.post('/notes', (req, res) => {
  // create note item from model
  var note = new Note({
    text: req.body.text, // specify text for each note item
    createdAt: req.body.createdAt
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
    // check if return data available for specific requested note ID...
    if (!note) {
      return res.status(404).send();
    }

    // otherwise return the data for the params ID
    res.send({note}); // return note item in object - more flexible than default array return
  }).catch((error) => { // catch return errors for query - e.g. network issue, DB corruption &c.
    res.status(400).send();
  });
});

// 4. DELETE route for single doc with ID
app.delete('/notes/:id', (req, res) => {
  // get params ID from req
  var params_id = req.params.id;
  console.log(params_id);

  // validate passed ID - check not valid
  if (!ObjectID.isValid(params_id)) {
    // return 404 status code for invalid ID
    return res.status(404).send();
  }

  // find doc by ID and remove from DB
  Note.findByIdAndRemove(params_id).then((note) => {
    // check if return data available
    if (!note) {
      return res.status(404).send();
    }
    // otherwise return the data for the deleted params ID
    res.send({note}); // return todo doc deleted...
  }).catch((error) => { // catch return errors for the query
    res.status(400).send();
  });
});

// 5. PATCH route for single doc with ID
app.patch('/notes/:id', (req, res) => {
  // get params ID from req
  var params_id = req.params.id;
  console.log(params_id);
  // only pick the properties we need for an update - stops false, unnecessary &c. properties being sent by the user
  var body = _.pick(req.body, ['text']); // pick method from lodash - gets only specified properties from return req
  // update updatedAt value for current date and time
  body.updatedAt = new Date().getTime(); // returns no. of ms from midnight 1 jan 1970 to current date...

  // validate passed ID - check not valid
  if (!ObjectID.isValid(params_id)) {
    // return 404 status code for invalid ID
    return res.status(404).send();
  }

  // update the requested doc in the db - using Mongoose method, findByIdAndUpdate()
  Note.findByIdAndUpdate(params_id, {$set: body}, {new: true}).then((note) => { // MongoDB update - set object to body, and return the new doc object - new: true (mongoose naming for returnOriginal)
    // check doc object exists - return 404 for not found
    if (!note) {
      return res.status(404).send();
    }
    // if doc found - send doc object
    res.send({note});
  }).catch((error) => { // catch error
    res.status(400).send(); // send back error status - bad request code
  });
});

/*
* API routes - USERS
* POST, GET
*/

// 1. POST route for adding a user - /users
app.post('/users', (req, res) => {
  // use Lodash pick method - retrieve specific properties of the API request
  var body = _.pick(req.body, ['email', 'password']);
  // new instance of user model - pass picked values from request
  var user = new User(body);
  // save user to DB - then handle response - & catch any errors
  user.save().then(() => {
    // call method from user model - use return token in promise chain...
    return user.generateAuthToken();
  }).then((token) => {
    // send back user with the updated token...and send custom header for auth token
    res.header('x-auth', token).send(user); // `x-...` in a header indicates a custom header...
  }).catch((error) => {
    res.status(400).send(error);
  })
});

// 2. GET route for user details - authenticated route
app.get('/users/me', authenticate, (req, res) => {
  // send the user from the authenticated request
  res.send(req.user);
});

// 3. POST route for user login - /users/login
app.post('/users/login', (req, res) => {
  // pick data for email and password from request body
  var body = _.pick(req.body, ['email', 'password']);

  // find the user by email and password - use return user object
  User.findByCredentials(body.email, body.password).then((user) => {
    // get a new token for the user - use abstracted function created for user save...
    return user.generateAuthToken().then((token) => {
      // set the header to x-auth with token, and send response body back as `user`
      res.header('x-auth', token).send(user);
    });
  }).catch((error) => {
    // tell user they were unable to login...
    res.status(400).send(); // send status of 400 for error...
  });
});
