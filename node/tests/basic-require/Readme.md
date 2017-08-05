### Readme - Development - Node.js - Basic Require

A simple test app with Node.js - tests working with `require`

#### v0.1 - load module with `require` from default Node.js modules
  * app.js - app's initialisation file
  * declare variables for module objects
    * e.g. fs, os
    * `const` - not modifying value of variable
  * fs - append text string to specified text file
    * create new file if not available
  * os - get username for current OS logged in user
    * output username to console and note file

#### v0.2 - load local file & call custom functions &c.
  * app.js - initialisation
  * notes_io.js - custom functions &c. for notes app I/O
    * test function for `createNote()`
    * export function for use in app.js
  * use exported `createNote()` function
  * test output to console...

#### v0.3 - install and load third party modules from NPM
  * test loading an external third-party module
    * *lodash* module downloaded using NPM
    * test calling *lodash* methods...
