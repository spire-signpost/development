/*
  node-notes - v0.1
  notes_io.js - custom I/O for notes app
*/

// test initial loading of app file
console.log("notes i/o starting - notes_io.js loading");

// api - create note function
module.exports.createNote = (note, author) => {
    console.log("create note...");
    return "note = " + note + " - by " + author;
}
