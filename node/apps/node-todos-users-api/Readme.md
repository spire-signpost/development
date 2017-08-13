### Readme - Apps - Node Todos Users API

Basic Todos app with Node.js, Mongoose, and MongoDB.

Features include,

  * Todos app combining Node.js, Mongoose, MongoDB &c.
  * using Mongoose to model data for MongoDB
  * Todos app to create, read, update, and delete Todo items
  * users and authentication
  * security updates

#### v0.1 - add POST route for users
  * update User model - include email, password, tokens
  * add new post route to server.js
  * save user to db
  * check with Postman - n.b. server needs to be restarted, DB wiped

#### v0.2 - test authentication options for users
  * add playground test for hashing and salting token concept - hash-sha
    * use npm module `crypto-js` for test
  * add playground test for JWT authentication - hash-jwt
    * use npm module for JWT `jsonwebtoken` for production app

#### v0.3 - add auth and custom user models
  * add auth token creation and save to POST /users route in server.js
  * add custom methods to user model
    * generate auth token
    * override json return for user object

#### v0.4 - add private GET route for users
  * add GET route for users to check their details
  * add authentication by validating token in header
  * add error handling for token errors, no user &c.
  * test with postman

#### v0.5 - abstract authentication to middleware
  * add new middleware directory and authenticate file
  * abstract authentication to separate function
  * call authenticate from private API route
  * test with postman

#### v0.6 - hashing passwords and middleware
  * use npm module `bcryptjs` for hash and salt
  * add bcrypt tests to playground
  * add mongoose middleware to user schema
    * use `pre()` to schema to hash and salt password
    * then continue schema execution to save doc to db
  * test with postman
