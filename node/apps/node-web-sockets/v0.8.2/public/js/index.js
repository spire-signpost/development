/**
* index.js - app config and logic
*
**/

/*
* sockets
*/

// store socket connection - listen for connections from client to server, and vice-versa...
var socket = io();
var messages = document.getElementById('messages');

// scroll to foot of window - notes/messages output
function scrollToFoot() {
  // selector - get last element in #messages
  var newMsg = messages.lastChild;
  // heights
  var clientHeight = messages.clientHeight;
  var scrollTop = messages.scrollTop;
  var scrollHeight = messages.scrollHeight;

  // get last message height
  var newMsgHeight = newMsg.clientHeight;
  // get penultimate message height
  var penulMsgHeight = newMsg.previousSibling.clientHeight;

  // update scrollTop to scrollHeight as messages are output at bottom of element...top will not scroll
  if (clientHeight + scrollTop + newMsgHeight + penulMsgHeight >= scrollHeight) {
    console.log('scroll...');
    // update value for property scrollTop - element updates to show new message if user at bottom of scroll...
    messages.scrollTop = scrollHeight;
  }
}

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
  // use Moment to format createdAt timestamp
  var formatTime = moment(note.createdAt).format('h:mm:ss a');
  // create element with note content
  var li = $('<li>');
  // add text for note author, created time, and note text
  li.text(`${note.author} @ ${formatTime}: ${note.text}`);
  // append new element to DOM placeholder
  $('#messages').append(li);
  // scroll to foot of window output
  scrollToFoot();
});

// listen for a message to a single user - current socket connection
socket.on('userMessage', (message) => {
  console.log(message);
  // use Moment to format createdAt timestamp
  var formatTime = moment(message.createdAt).format('h:mm:ss a');
  // create element with message content
  var li = $('<li>');
  li.text(`${message.from} @ ${formatTime}: ${message.text}`);
  // append new element to DOM placeholder
  $('#messages').append(li);
  // scroll to foot of window output
  scrollToFoot();
});

// listen for a broadcast group message - all connected users except originating user (i.e. new user joined...)
socket.on('groupMessage', (message) => {
  console.log(message);
  // use Moment to format createdAt timestamp
  var formatTime = moment(message.createdAt).format('h:mm:ss a');
  // create element with message content
  var li = $('<li>');
  li.text(`${message.from} @ ${formatTime}: ${message.text}`);
  // append new element to DOM placeholder
  $('#messages').append(li);
  // scroll to foot of window output
  scrollToFoot();
});
