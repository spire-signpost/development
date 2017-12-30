/*
  node-notes - v0.4
  notes_io.js - custom I/O for notes app
    - refactor code...part1
*/

// test initial loading of app file
console.log("notes i/o starting - notes_io.js loading");

// require default FS module
const fs = require('fs');

// fetch notes from JSON file
var fetchNotes = () => {
    // code to check for an error
    try {
        // read existing notes from JSON file
        var currentNotes = fs.readFileSync('notes.json');
        // parse notes string...
        return JSON.parse(currentNotes);
    } catch (error) {
        // if error, catch will be run...
        return [];
    }



};

// save notes to JSON file
var saveNotes = (notes) => {
    // write note to notes JSON file
    fs.writeFileSync('notes.json', JSON.stringify(notes));
};

// api - create note function
var createNote = (title, author) => {
    console.log("create note...", title);
    // fetch all notes from JSON
    var notes = fetchNotes();
    // note object - using ES6 syntax...
    var note = {
        title,
        author
    };

    // check for duplicate notes in the JSON file...
    var duplicates = notes.filter((note) => note.title === title);

    // check length of duplicates before saving JSON file
    if (duplicates.length === 0) {
        // add new note to existing notes array
        notes.push(note);
        // save notes
        saveNotes(notes);
        // return note added - e.g. back to app.js
        return note;
        //check note creation
        console.log("note created...");
    }

};

// export the api for the module
module.exports = {
    createNote //ES6 equivalent of createNote: createNote
};
