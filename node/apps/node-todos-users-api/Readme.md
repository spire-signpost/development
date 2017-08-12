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
