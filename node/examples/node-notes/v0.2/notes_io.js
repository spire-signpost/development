/*
  node-notes - v0.2
  notes_io.js - custom I/O for notes app
*/

// test initial loading of app file
console.log("notes i/o starting - notes_io.js loading");

// api - create note function
var createNote = (title) => {
    console.log("create note...", title);
    // add logic to create new note...
};

// export the api for the module
module.exports = {
    createNote //ES6 equivalent of createNote: createNote
};
