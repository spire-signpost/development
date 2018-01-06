/**
* messaging.js - abstracted utils for messaging
*
**/

var currentDate = new Date().getTime();

// abstract generation of message
var messageGenerator = (from, text) => {
  return {
    from,
    text,
    createdAt: currentDate
  }
};

module.exports = {
  messageGenerator
};
