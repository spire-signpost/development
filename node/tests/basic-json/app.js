/*
    basic-json - test reading and writing json with Node.js
    - app.js
*/

/* TEST - Uncomment to run tests with JSON...
// create simple object
var testObj = {
    author: 'ancientlives'
};

// create a string from the passed object
var testStringObj = JSON.stringify(testObj);

// test string
console.log(typeof testStringObj);

// output string
console.log(testStringObj);

// test string
var authorString = '{"author":"yvaine"}'

// parse string back to JSON object
var author2 = JSON.parse(authorString);

// test JSON object
console.log(typeof author2);
//output author2 object
console.log(author2);
*/

// require default FS module
const fs = require('fs');

// define test note object
var testNote = {
    title: 'note 1',
    author: 'daisy'
};

// stringify object to save to file
var testNoteString = JSON.stringify(testNote);

// write string to file using FS module
fs.writeFileSync('notes.json', testNoteString);

// read string from notes.json file
var noteJSON = fs.readFileSync('notes.json');

// parse string to object to be used in app...
var note = JSON.parse(noteJSON);

// check return testNote object
console.log(typeof note);
console.log(note.title, note.author);
