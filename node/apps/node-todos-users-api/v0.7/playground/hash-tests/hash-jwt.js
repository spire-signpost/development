// require npm module - json web token - jwt
const jwt = require('jsonwebtoken');

// simulate user data and return token - i.e. ID sent by user and return token for app usage
// user id
var data = {
  id: 7
};

// pass data object and secret for salting...
var token = jwt.sign(data, 'salted');
// console output token
console.log(token);

// pass token to verify with secret for salting...
var tokenDecode = jwt.verify(token, 'salted');
// console output decoded token
console.log('token decoded = ', tokenDecode);
