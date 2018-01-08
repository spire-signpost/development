### Development - Node - Apps - Node Notes API

Basic Notes app with Node.js, Mongoose, and MongoDB.

Deploy app to Heroku with add-on mLab MongoDB.

Features include,

  * Notes app combining Node.js, Mongoose, MongoDB &c.
  * using Mongoose to model data for MongoDB
  * Notes app to create, read, update, and delete Note items

#### v0.1 - use Mongoose with Node.js and MongoDB
  * install and setup Mongoose
  * create a simple model
  * create a document using the model
  * set validators for model properties
  * save document to the DB

#### v0.2 - start to build API
  * refactor code for Mongoose
  * refactor code for models &c.
  * add API for notes - setup server
  * add API for notes - POST route

#### v0.3 - update API routes with initial validation
  * add API for notes - GET route
  * add API for notes - GET route with parameter
  * add validation &c.
  * Mongoose - call `findById()`

#### v0.4 - remote hosting and data store
  * Heroku & MongoDB
  * deploy app with DB support

#### v0.5 - update API with delete options
  * DELETE route and options
  * add API for notes - DELETE route with parameter

#### v0.6 - update API with patch options
  * add utility module - Lodash
  * add API for notes - PATCH route with parameter

#### v0.7 - update note model
  * modify note for `updatedAt` and `createdAt`

#### v0.8 - add user model and route
  * add user model and access
  * add API for users - POST route for adding users

#### v0.9 - add API for users
  * add auth tokens
  * Schema for user model
  * Schema usage for user & update POST route for users

#### v0.9.1 - add API for users
  * private route for GET `/users/me`

#### v0.9.2 - authentication
  * abstract and refactor private route
  * bcrypt hashing and salting

#### v0.9.3 - add API for users
  * POST /users/login
  * add verification for email
  * check hashed password

#### v0.9.4 - add API for users
  * DELETE /users/me/token
