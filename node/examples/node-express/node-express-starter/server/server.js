/**
* server.js - Express config and setup
*
**/

// require node module 'path' - built-in module
const path = require('path');
// require express module
const express = require('express');

// define path to static dir public
const publicDir = path.join(__dirname, '../public');
// define port for use with local and hosted heroku
const port = process.env.PORT || 3030;
// define variable to call express methods
var app = express();

// configure express static middleware
app.use(express.static(publicDir));

// start server on defined port - add callback function
app.listen(port, () => {
  console.log(`server running on env port ${port}`);
});
