/*
  node-notes - v0.2
  app.js - main app initialisation
*/

// test initial loading of app file
console.log("app starting - app.js loading");

// require modules - file system, operating system
const fs = require("fs");
const os = require("os");
// require local file
const notesio = require("./notes_io.js");

// variables for os - call method from os module for user information
var user = os.userInfo();

// use function from notesio = create note
var create = notesio.createNote("test note", user.username);

// test calling create function...
console.log(create);

// output user information
console.log("your note is now being created, " + user.username + "!");


// call method from fs module - es6 compatible - template literals (uses back-tick...)
fs.appendFile(`test-note.txt`, `welcome to node note... ${user.username}!`, function(error) {
    if (error) {
        console.log("error - unable to append to file...");
    }
});
