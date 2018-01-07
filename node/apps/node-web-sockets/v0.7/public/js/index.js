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
  // create element with note content
  var li = $('<li>');
  li.text(`${note.author}: ${note.text}`);
  // append new element to DOM placeholder
  $('#messages').append(li);
});

// listen for a message to a single user - current socket connection
socket.on('userMessage', (message) => {
  console.log(message);
  // create element with message content
  var li = $('<li>');
  li.text(`${message.from}: ${message.text}`);
  // append new element to DOM placeholder
  $('#messages').append(li);
});

// listen for a broadcast group message - all connected users except originating user (i.e. new user joined...)
socket.on('groupMessage', (message) => {
  console.log(message);
  // create element with message content
  var li = $('<li>');
  li.text(`${message.from}: ${message.text}`);
  // append new element to DOM placeholder
  $('#messages').append(li);
});
