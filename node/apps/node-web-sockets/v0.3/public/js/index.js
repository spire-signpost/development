/**
* index.js - app config and logic
*
**/

/*
* sockets
*/

// store socket connection - listen for connections from client to server, and vice-versa...
var socket = io();

// listen for a socket event - default connect to server
socket.on('connect', () => {
  console.log('connected to server...');

  // emit custom event for new created note - listen on the server
  socket.emit('createNote', {
    text: 'a new note has been created by the client...'
  });
});

// listen for a socket event - default disconnect from server
socket.on('disconnect', () => {
  console.log('disconnected from server...');
});

// listen for new note created on the server
socket.on('newNote', (note) => {
  console.log(`new note - ${note}`);
});
