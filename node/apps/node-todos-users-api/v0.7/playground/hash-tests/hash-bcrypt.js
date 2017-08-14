// require npm module - json web token - jwt
const jwt = require('jsonwebtoken');

// require npm module - bcrypt hashing and salting
const bcrypt = require('bcryptjs');

// test pasword string
var password = "abcd1234";

// generate salt and then hash - 15 rounds to salt password
bcrypt.genSalt(15, (error, salt) => {
  // three arguments for hash() - password to hash, salt just created, and callback for success and failure
  bcrypt.hash(password, salt, (error, hash) => {
    console.log(hash);
  });
});
