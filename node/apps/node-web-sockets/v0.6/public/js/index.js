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
});

// listen for a socket event - default disconnect from server
socket.on('disconnect', () => {
  console.log('disconnected from server...');
});

// listen for new note created on the server
socket.on('newNote', (note) => {
  console.log(note);
});

// listen for a message to a single user - current socket connection
socket.on('userMessage', (message) => {
  console.log(message);
});

// listen for a broadcast group message - all connected users except originating user (i.e. new user joined...)
socket.on('groupMessage', (message) => {
  console.log(message);
});

// emit event for create note from client
socket.emit('createNote', {
  author: 'spire',
  text: 'test note from the client...'
}, (data) => {
  console.log(`${data.text} - ${data.createdAt}`);
});
