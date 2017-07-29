### Development - Node - Tests - Node Mongo Driver

Basic tests for using the MongoDB native driver with Node.js.

Features include,

  * connecting and writing to MongoDB from Node.js
  * general usage for MongoDB...

#### v0.1 - connect to MongoDB and write some data
  * add mongodb native connection
  * test connection
  * create db, collection, and add documents
  * check log to console for new documents
  * get and output timestamp from ObjectId
  * add ES6 destructuring

#### v0.2 - fetch some data from MongoDB
  * test connection to specified collection in MongoDB
  * query and find all documents in a collection
  * query and find documents that match a specified query in a collection
    * e.g. using a name:value pair or ObjectID...
  * count documents in a collection
    * return total...

#### v0.3 - delete data in MongoDB
  * delete many documents
  * delete a single document
  * delete a single document
    * return data value for deleted document

#### v0.4 - update data in MongoDB
  * find and update a document
  * specify properties to update - e.g. `$set` and `$inc`
  * return updated document data
