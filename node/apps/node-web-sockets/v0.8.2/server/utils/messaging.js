/**
* messaging.js - abstracted utils for messaging
*
**/

// require Moment time library
const moment = require('moment');

// abstract generation of message - use Moment.js for timestamp
var messageGenerator = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

module.exports = {
  messageGenerator
};
