/*
  Node.js, MongoDB, and Mongoose Todo app - users
  - v1.0
  - authenticate.js
  - middleware to authenticate a user
  _ call for API routes &c.
*/

// require local file - user model
var {User} = require('./../models/user-model');

// three arguments for middleware - request, response, next
var authenticate = (req, res, next) => {
  // get token from header - req will sent for the returned header
  var token = req.header('x-auth'); // key from the header is `x-auth`

  // call user model method with token - check return promise for user
  User.findByToken(token).then((user) => {
    // check user return
    if (!user) {
      // reject promise - code execution stops and exits...
      return Promise.reject();
    }

    // modify request object - user
    req.user = user; // set user in request object to user just found...
    // modify request object - token
    req.token = token; // set token to above token from `x-auth` header
    // call next to run code in function that calls this middleware
    next();
  }).catch((error) => {
    // send back 401 status - error code
    res.status(401).send();
  });
};

// module export
module.exports = {
  authenticate // ES6 shortcut for User: User
};
