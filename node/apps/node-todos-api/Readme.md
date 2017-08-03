### Development - Node - Apps - Node Todos API

Basic Todos app with Node.js, Mongoose, and MongoDB.

Deploy app to Heroku with add-on mLab MongoDB.

Features include,

  * Todos app combining Node.js, Mongoose, MongoDB &c.
  * using Mongoose to model data for MongoDB
  * Todos app to create, read, update, and delete Todo items

#### v0.1 - use Mongoose with Node.js and MongoDB
  * install and setup Mongoose
  * create a simple model
  * create a document using the model
  * set validators for model properties
  * save document to the DB

#### v0.2 - add route for Todo API - POST
  * refactor app for modules and models
  * add api route for POST
  * update DB
  * test route with Postman

#### v0.3 - test api route and functions - POST
  * setup testing suite
  * test POST API route
  * test add todo item
  * test not creating todo item with invalid data

#### v0.4 - add route for Todo API - GET
  * add GET route
  * find and return todo items from DB
  * test with Postman

#### v0.5 - test api route and functions - GET
  * modify tests for GET route
  * update `beforeEach` to add dummy objects for todo items
  * update length checks for new dummy objects for POST route
  * add `describe` for GET route test

#### v0.6 - Mongoose query options
  * query options for find all, find one, and find by ID
  * return found docs
  * add validation
    * basic with catch
    * additional with ObjectID and MongoDB native driver - `isValid()` &c.

#### v0.7 - test api route and function - GET route with parameter
  * add GET route with params
  * check and validate passed params
  * find and return data or send back error...
  * test with Postman & update `server.test.js` test cases...
    * add dummy docs to DB, and test route with ObjectID

#### v0.8 - deploy app to Heroku with MongoDB publication
  * update Port setting to work with local and Heroku
  * update app listen to use dynamic port
  * modify package.json for start script and engines
  * test deploy to Heroku

#### v0.9 - add route and tests for Todo API - DELETE route with parameter
  * add DELETE route with params
  * create test methods for removing docs by id &c.
  * test with Postman

#### v1.0 - add route and tests for Todo API - PATCH route with parameter
  * add lodash js utility library
  * add PATCH route with params
  * check and validate required params - pick only required params for body
  * modify completed and completedAt as part of update
  * update and return doc in DB - new doc
  * error handling for todo item
  * test with Postman

#### v1.0.1 - basic refactor of code structure
  * basic refactor of server.js
  * add config for env variables
