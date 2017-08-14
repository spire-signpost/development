/*
  TEST FILE
  - Node.js, MongoDB, and Mongoose Todo app - users
  - seeding test data for API routes
  - v0.7
  - seed.data.js
*/

// ObjectID property from MongoDB object
const {ObjectID} = require('mongodb');
// npm module - require json web token library
const jwt = require('jsonwebtoken');
// todo from todo model
const {Todo} = require('./../../models/todo-model');
// user from user model
const {User} = require('./../../models/user-model');

// create object id from mongo for first user
const userIdOne = new ObjectID();
// create onject id from mongo for second user
const userIdTwo = new ObjectID();
// create array for users - one with token auth, the other without auth
const users = [{
  _id: userIdOne,
  email: 'test@test.com',
  password: 'userpass1',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userIdOne, access: 'auth'}, 'salted').toString()
  }]
}, {
  _id: userIdTwo,
  email: 'tester2@test.com',
  password: 'userpass'
}];

// update dummy todo items with test ID name:value pair property
const todos = [
  {
    _id: new ObjectID(),
    text: 'a todo item...'
  },
  {
    _id: new ObjectID(),
    text: 'another todo doc item...',
    completed: true,
    completedAt: 230797
  }
];

// create some dummy todos for testing
const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

// create some dummy users for testing
const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    // wait for both promises to return or either to fail
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
