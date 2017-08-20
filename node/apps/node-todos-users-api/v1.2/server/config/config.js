/*
  Node.js, MongoDB, and Mongoose Todo app - users
  - v1.2
  - config.js
  - general config, incl. env variables...
*/

/*
  set required environment variables
*/
// set some environment variables
var env = process.env.NODE_ENV || 'development';
// log current environment
console.log('current env =', env);

// check environment and load appropriate settings
if (env === 'development' || env === 'test') {
  // require json - returns an object for the json
  var config = require('./config.json');
  // get config properties for specified env - e.g. development or test
  var envConf = config[env]; // store defined env

  Object.keys(envConf).forEach((key) => { // iterate over keys array - pass key to callback function
    // for each key - get value from envConf
    process.env[key] = envConf[key]; // use bracket notation to set property of `process.env`
  });
}
