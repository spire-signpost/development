/*
  node-express - basic-structure - basic-template-1
  - server.js
  - setup express web server
  - add initial api routes
  - add templates with handlebars & set partials & helpers...
  - using middleware with express
*/

// require fs from node default
const fs = require('fs');
// require express web framework
const express = require('express');
// require handlebars template engine
const hbs = require('hbs');

// store port for the app - e.g. port set by heroku for hosting OR set default for local dev...
const port = process.env.PORT || 3030; // process.env object stores env variables as key:value pairs
// use express
var app = express();

// register partials with handlebars
hbs.registerPartials(__dirname + '/views/partials');
// set view engine for app - handlebars
app.set('view engine', 'hbs')
// middleware - serve static files from public dir
app.use(express.static(__dirname + '/public'));

// custom middleware - a simple logger for the app
app.use((req, res, next) => {
  var now = new Date().toString();
  // log details from the returned request object
  var logger = `request: method = ${req.method} & url = ${req.url}`;

  // output logger details to console
  console.log(logger);
  // save logger details to log file
  fs.appendFile('request.log', logger + '\n', (err) => {
    if (err) {
      console.log('write to log file failed...');
    }
  });
  next();
});

// custom middleware - a maintenance template for a server
// app.use((req, res, next) => {
//   res.render('maintenance.hbs'); // server paused for maintenance...
// });

// two parameters - name of the helper function and function to run...
hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});

// pass parameter value to helper - then use in function to make upper case...
hbs.registerHelper('makeUpper', (text) => {
  return text.toUpperCase();
});

/*
api routes for server
*/

// api - get route for root of server
app.get('/', (req, res) => { // req = http request, res = server response to request
  console.log('root has now been loaded...');
  res.render('home.hbs', {
    title: 'Home Page'
  });
});

// api - test help page route
app.get('/help', (req, res) => {
  res.render('help.hbs', {
    title: 'Help Page'
  });
});

// api - test json route
app.get('/json', (req, res) => {
  res.send({
    title: 'test express server',
    subTitle: 'load test json',
    author: 'test-dev'
  });
});

// specify port number for server
app.listen(port, () => {
  // output server and port - heroku will modify randomly...
  console.log(`server now listening on port ${port}`);
});
