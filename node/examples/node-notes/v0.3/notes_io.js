/*
  node-notes - v0.3
  notes_io.js - custom I/O for notes app
*/

// test initial loading of app file
console.log("notes i/o starting - notes_io.js loading");

// require default FS module
const fs = require('fs');

// api - create note function
var createNote = (title, author) => {
    console.log("create note...", title);
    // array to store all notes
    var notes = [];
    // note object - using ES6 syntax...
    var note = {
        title,
        author
    };

    // code to check for an error
    try {
        // read existing notes from JSON file
        var currentNotes = fs.readFileSync('notes.json');
        // parse notes string...
        notes = JSON.parse(currentNotes);
        console.log("notes file found - ", notes);
    } catch (error) {
        // if error, catch will be run...
        console.log("no JSON file found...");
    }

    // check for duplicate notes in the JSON file...
    var duplicates = notes.filter((note) => note.title === title);

    // check length of duplicates before saving JSON file
    if (duplicates.length === 0) {
        // add new note to existing notes array
        notes.push(note);
        // write note to notes JSON file
        fs.writeFileSync('notes.json', JSON.stringify(notes));
        //check note creation
        console.log("note created...");
    } else {
        console.log("duplicate title found in notes...");
    }

};

// export the api for the module
module.exports = {
    createNote //ES6 equivalent of createNote: createNote
};
