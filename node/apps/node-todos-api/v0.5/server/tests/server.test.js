/*
  TEST FILE
  - Node.js, MongoDB, and Mongoose Todo app - v0.5
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

// local files
const {app} = require('./../server');
const {Todo} = require('./../models/todo-model');

const todos = [
  {text: 'a todo item...'},
  {text: 'another todo item...'}
];

// before a describe block is executed - wipe existing todo items stored in data store - add dummy data objects
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

// describe for the POST API route
describe('POST /todos', () => {
  // add test cases for this route
  it('should create a new todo item', (done) => {
    var text = 'some text for a todo item...';

    // use Supertest to test POST
    request(app)
      .post('/todos')
      .send({
        text // ES6 shortcut for text: text
      })
      .expect(200) // assertion to test status code
      .expect((res) => { // create custom assertion to test response body text
        expect(res.body.text).toBe(text); // test that the response text matches the text specified above in var text
      })
      .end((error, res) => { // check todo item was saved to MongoDB
        if (error) {
          return done(error);
        }

        // find todo with specified var text
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e)); // catch any errors in callback - then pass to done() to finish
      });
  });

  it('should not create a todo item with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({}) // send empty data to post route
      .expect(400) // expect status code 400
      .end((error, res) => {
        if (error) {
          return done(error); // finish test if error returned
        }

        // find and return all todos in the DB - DB wiperd beforeEach - should be 0 if no todo item created...
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2); // checking for dummy data - 2 objects
          done();
        }).catch((e) => done(e));
      });
  });

});

// describe for the GET API route
describe('GET /todos', () => {
  it('should GET all todo items...dummy data found', (done) => {
    request(app)
      .get('/todos') // specify api url
      .expect(200) // check status code - 200 for OK
      .expect((res) => { // custom assertion
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
