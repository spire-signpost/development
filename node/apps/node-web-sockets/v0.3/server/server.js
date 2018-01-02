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

  //emit an event for a newly created note - return object (or just event, boolean &c.)
  socket.emit('newNote', {
    text: 'a new note...',
    createdAt: currentDate
  });

  // listen for custom event from client - create a note
  socket.on('createNote', (newNote) => {
    console.log('createNote from client', newNote);
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
