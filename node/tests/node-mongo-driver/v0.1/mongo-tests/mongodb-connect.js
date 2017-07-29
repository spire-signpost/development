/*
  mongodb-connect.js - v0.1
  - test file for mongodb connections
  - uses node-mongodb-native
*/

// mongodb client
// const client = require('mongodb').MongoClient;
// mongodb client - use destructuring to set variable for client connection...
const {MongoClient} = require('mongodb');

// client connect - parameters = url and callback function
MongoClient.connect('mongodb://localhost:27017/NodeTodo', (err, db) => { // handle error and db connection
  // handle return errors for connection
  if (err) {
    return console.log("connection to mongodb failed..."); // return - causes exit from function...
  }
  console.log("now connected to mongodb...");

  // insert a single document to the db - a simple todo item
//   db.collection('Todos').insertOne ({
//     text: 'a simple todo item...',
//     completed: false
//   }, (err, result) => {
//     if (err) {
//       return console.log('error returned for todo insert', err);
//     }
//     console.log('todo successfully saved', JSON.stringify(result.ops, undefined, 2)); // nice log output to console
//   });
//
//   // close connection to mongodb
//   db.close()
// });

// insert a single document to the db - author details
db.collection('Authors').insertOne ({
  name: 'yvaine',
  location: 'wiltshire'
}, (err, result) => {
  if (err) {
    return console.log('error returned for author insert', err);
  }
  console.log('author successfully saved', JSON.stringify(result.ops, undefined, 2)); // nice log output to console
  console.log(result.ops[0]._id); // use first inserted document - retrieve the generated _id
  console.log(result.ops[0]._id.getTimestamp()); // use first inserted document - get time stamp from first 4 bytes...
});

// close connection to mongodb
db.close()
});
