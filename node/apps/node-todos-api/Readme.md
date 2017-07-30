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

#### v0.8 - deploy app to Heroku with MongoDB publication
  * update Port setting to work with local and Heroku
  * update app listen to use dynamic port
  * modify package.json for start script and engines
  * test deploy to Heroku

#### v1.0 - test api route and function - PATCH route with parameter
  * add lodash js utility library
  * add PATCH route with params
  * check and validate required params - pick only required params for body
  * modify completed and completedAt as part of update
  * update and return doc in DB - new doc
  * error handling for todo item
  * test with Postman
