/**
* notes.js - abstracted utils for notes
*
**/

// require Moment time library
const moment = require('moment');

// abstract generation of message - use Moment.js for timestamp
var noteGenerator = (author, text) => {
  return {
    author,
    text,
    createdAt: moment().valueOf()
  }
};

module.exports = {
  noteGenerator
};
