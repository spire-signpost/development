/*
  node-notes - v0.3
  app.js - main app initialisation
  - create and save notes
*/

// test initial loading of app file
console.log("app starting - app.js loading");

// require modules - file system, operating system
const fs = require("fs");
// require third party modules from NPM
const _ = require("lodash");
const yargs = require("yargs");
// require local file
const notesio = require("./notes_io.js");

// get arguments from command line
const argv = yargs.argv;
var cmd = argv._[0]; // use yargs for command as well...
// test output from cli arguments - returns user input argument


// check user input and return conditional response
if (cmd === 'add') {
    console.log("add note command requested...");
    notesio.createNote(argv.title, argv.author);
} else if (cmd === 'delete') {
    console.log("delete note command requested...")
} else {
    console.log("no command requested...")
}
