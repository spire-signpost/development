/**
* notes.js - abstracted utils for notes
*
**/

var currentDate = new Date().getTime();

// abstract generation of message
var noteGenerator = (author, text) => {
  return {
    author,
    text,
    createdAt: currentDate
  }
};

module.exports = {
  noteGenerator
};
