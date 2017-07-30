/*
  TEST FILE
  - Node.js, MongoDB, and Mongoose Todo app - v0.8
  - server.test.js
*/

/*
  add required modules
  - npm modules
  - local files
*/

// npm modules
const expect = require('expect'); // test assertions
const request = require('supertest'); // test api routes
const {ObjectID} = require('mongodb'); // ObjectID property from MongoDB object

// local files
const {app} = require('./../server');
const {Todo} = require('./../models/todo-model');

// update dummy todo items with test ID name:value pair property
const todos = [
  {
    _id: new ObjectID(),
    text: 'a todo item...'
  },
  {
    _id: new ObjectID(),
    text: 'another todo item...'
  }
];

// before a describe block is executed - wipe existing todo items stored in data store - add dummy data objects
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

// check GET route with params ID
describe('GET /todos/:id', () => {
  // test case - route with params - success return
  it('should return a doc for a todo item...', (done) => { // done required due to async test...
    request(app)
      // use first object.id from dummy todos array - convert ObjectID to string with toHexString() method
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200) // assert - status code to match OK 200
      .expect((res) => { // assert that return body matches - e.g. text property matches return
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done); // call end and pass done to finish test case
  });

  // test case - route with params - 404 status return for doc not found
  it('should return a 404 status code for doc not found...', (done) => {
    var hexID = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexID}`) // GET route to test with param ID
      .expect(404) // assert - status code should be 404
      .end(done); // call end and pass done to finish test case
  });

  // test case - route with params - 404 for not valid ObjectIDs
  it('should return a 404 status code for non-valid &c. ObjectID', (done) => { // pass in a non-object ID for testing
    request(app)
      .get('/todos/abc123def') // pass in test invalid string - ObjectID has v. specific pattern
      .expect(404)
      .end(done);
  });

});
