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

#### v0.7 - add test data functions for seeding data
  * move test data functions to seed file
  * create dummy test data for users and todos
  * refactor code and structure for testing
  * run tests for seeding dummy data

#### v0.8 - add test cases for GET and POST users
  * update `server.test.js` for Users routes
  * add test cases for updated routes
    * test authentication, missing info, user validation and creation &c.
  * test for creating, saving, validating &c. user
  * test with mocha, expect, and supertest

#### v0.9 - add POST route for user login
  * add new route to `server.js`
    * POST route for user login
  * update user model to find a user with credentials
  * generate and return auth token
  * test with postman

#### v0.9.1 - add test cases for POST /users/login
  * update `server.test.js` with two test cases
  * test for valid login and return auth token
  * test for invalid login
  * test with mocha, expect, and supertest

#### v1.0 - add DELETE route to logout user
  * add DELETE route to `server.js`
  * logout authenticated user by removing token from db
  * add authentication check to route
  * test with postman

#### v1.0.1 - add test cases for DELETE logout route
  * add test case for deletion of token for user logout
  * check db for token deletion
  * test with postman
