/*
  node-notes - v0.1
  app.js - main app initialisation
*/

// test initial loading of app file
console.log("app starting - app.js loading");

// require modules - file system, operating system
const fs = require("fs");
const os = require("os");

// variables for os - call method from os module for user information
var user = os.userInfo();

// output user information
console.log("your note is now being created, " + user.username + "!");


// call method from fs module - es6 compatible - template literals (uses back-tick...)
fs.appendFile(`test-note.txt`, `welcome to node note... ${user.username}!`, function(error) {
    if (error) {
        console.log("error - unable to append to file...");
    }
});
