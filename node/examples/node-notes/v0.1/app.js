/*
  node-notes - v0.1
  app.js - main app initialisation
*/

// test initial loading of app file
console.log("app starting - app.js loading");

// require modules - file system, operating system
const fs = require("fs");
// require third party modules from NPM
const _ = require("lodash");
// require local file
const notesio = require("./notes_io.js");

// get arguments from command line
var cmd = process.argv[2];
// test output from cli arguments - returns user input argument
console.log('Command: ', cmd);

// check user input and return conditional response
if (cmd === 'add') {
    console.log("add note command requested...");
} else if (cmd === 'delete') {
    console.log("delete note command requested...")
} else {
    console.log("no command requested...")
}
