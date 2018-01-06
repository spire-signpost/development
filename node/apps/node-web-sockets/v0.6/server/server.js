/**
* server.js - Express config and setup
*
**/

// require node module 'path' - built-in module
const path = require('path');
// explicit require of HTTP module
const http = require('http');
// require express module
const express = require('express');
// require socketio module
const socketIO = require('socket.io');


// require local utils-message generator
const {messageGenerator} = require('./utils/messaging');
// require local utils-message generator
const {noteGenerator} = require('./utils/notes');
// define path to static dir public
const publicDir = path.join(__dirname, '../public');
// define port for use with local and hosted heroku
const port = process.env.PORT || 3030;
// define variable to call express methods
var app = express();
// create explicit HTTP server - pass Express app due to HTTP and Express usage
var server = http.createServer(app);
// pass server to socket io
var io = socketIO(server);

// configure express static middleware
app.use(express.static(publicDir));

var currentDate = new Date().getTime();

io.on('connection', (socket) => {
  console.log('new user connection...');

  /*
  * 1. emit to specific user of the socket
  * 2. broadcast to all remaining users
  */
  socket.emit('userMessage', messageGenerator('admin', 'welcome User to the notes app...'));

  socket.broadcast.emit('groupMessage', messageGenerator('admin', 'a new User has joined the notes app...'));

  /*
  * 1. listen for custom event from client for a new note
  * 2. emit an event for a newly created note on the server - return object (or just event, boolean &c.)
  */
  socket.on('createNote', (note, clientCallback) => {
    console.log('createNote from client', note);
    // app wide event broadcast
    io.emit('newNote', noteGenerator(note.author, note.text));
    // send call to function on client side - callback setup in socket.emit for createNote
    // send call to function on client side - callback setup in socket.emit for createNote
    clientCallback({
      text: 'acknowledging new note...',
      createdAt: currentDate
    });

    // socket.broadcast.emit('newNote', {
    //   text: newNote.text,
    //   createdAt: currentDate
    // });
  });

  // listen for default disconnect event for this socket
  socket.on('disconnect', () => {
    console.log('user was disconnected...');
  });
});

// start server on defined port - add callback function - use explicit HTTP server
server.listen(port, () => {
  console.log(`server running on env port ${port}`);
});
