/*
  TEST FILE
  - Node.js, MongoDB, and Mongoose Todo app - users
  - v1.0
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
const {User} = require('./../models/user-model');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

// wipe users and then add dummy data for testing
beforeEach(populateUsers);
// before a describe block is executed - wipe todo items stored in data store - add dummy data objects
beforeEach(populateTodos);

/*
  test routes - TODOS
  - POST
  - GET
  - DELETE
  - PATCH
*/

// describe for the POST API route
describe('POST /todos', () => {
  // add test cases for this route
  it('should create a new todo item', (done) => {
    var text = 'some text for a todo item...';

    // use Supertest to test POST - pass app object
    request(app)
      .post('/todos') // call post method from app object - i.e. call api route
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

// check GET route with params ID
describe('GET /todos/:id', () => {
  // test case - route with params - success return
  it('should return a doc for a todo item...', (done) => { // done required due to async test...
    request(app)
      // use first object.id from dummy todos array - convert ObjectID to string with toHexString() method
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .expect(200) // assert - status code to match OK 200
      .expect((res) => { // assert that return body matches - e.g. text property matches return
        expect(res.body.todo.text).toBe(todos[1].text);
      })
      .end(done); // call end and pass done to finish test case
  });

  // test case - route with params - 404 status return for doc not found
  it('should return a 404 status code for doc not found...', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`) // GET route to test with param ID
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

// check DELETE route with params ID
describe('DELETE /todos/:id', () => {
  // test case - check requested todo doc item has been removed
  it('should delete a doc for a todo item', (done) => {
    // specify test todo to delete
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`) // remove the specified doc by id
      .expect(200) // assert a 200 status code for the successful doc deletion
      .expect((res) => { // add custom assertion
        expect(res.body.todo._id).toBe(hexId); // assert that response body todo doc id matches the hexId
      })
      .end((error, res) => { // finish request
        if (error) { // handle error
          return done(error); // if error exists simply return the request as done...
        }

        // find doc id in db
        Todo.findById(hexId). then((todo) => {
          expect(todo).toNotExist(); // check that doc id does not exist in db
          done(); // call done and finish async all
        }).catch((error) => done(error)); // catch any error for async call - return done if error caught...
      });
  });

  // test case - check return status code for doc not found in DB
  it('should return a 404 status code for doc not found', (done) => {
    var hexID = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexID}`) // DELETE route to test with param ID
      .expect(404) // assert - status code should be 404
      .end(done); // call end and pass done to finish test case
  });

  // test case - check if doc object id is valid
  it('should return a 404 status code for invalid ObjectID...', (done) => {
    request(app)
      .delete('/todos/abc123def') // pass in test invalid string - ObjectID has v. specific pattern
      .expect(404)
      .end(done);
  });
});

// check PATCH route with params ID
describe('PATCH /todos/:id', () => {
  // test case - check update with params for doc id
  it('should patch and update the todo item', (done) => {
    // get ID from dummy todos object - first object
    var hexId = todos[0]._id.toHexString();
    // text for testing PATCH update
    var text = 'some test new text...';

    // setup test with assertions
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text // ES6 shortcute for name:value pair
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  // test case - check completedAt relative to complete property
  it('should reset and clear completedAt property when todo item is not completed', (done) => {
    // get ID from dummy todos object - second object
    var hexId = todos[1]._id.toHexString();
    // text for testing PATCH update
    var text = 'some more test new text...';

    // setup test with assertions
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false, // todo item not completed
        text // ES6 shortcute for name:value pair
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text); // assert text matches dummy text
        expect(res.body.todo.completed).toBe(false); //assert completed property false - todo item not completed
        expect(res.body.todo.completedAt).toNotExist(); // assert completedAt does not exist - should be null...
      })
      .end(done);
  });
});

/*
  test routes - USERS
  - GET /users/me
  - POST /users
*/

// test GET route for /users/me
describe('GET /users/me', () => {
  // test case - check user return for successful authentication...
  it('should return user if authentication successful...', (done) => {
    request(app)
      .get('/users/me') // specify api route
      .set('x-auth', users[0].tokens[0].token) // add custom header to request
      .expect(200) // should return a 200 status code - OK
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  //test case - check for missing or false authentication - no x-auth header
  it('should return an error code 401 for no authentication...', (done) => {
    request(app)
      .get('/users/me')
      .expect(401) // should return a 401 status code
      .expect((res) => {
        expect(res.body).toEqual({}); // retun body should be empty - not another user's data &c.
      })
      .end(done);
  });
});

// test POST route for /users
describe('POST /users', () => {
  //test case - check user created successfully
  it('should create a new user', (done) => {
    // set some dummy data for test case
    var email = 'tester@test.com';
    var password = 'abcdef1234';

    request(app)
      .post('/users') // POST request to /users API route
      .send({email, password}) // send dummay data for a new user
      .expect(200) // should return a 200 status code - OK
      .expect((res) => {
        expect(res.headers['x-auth']).toExist(); // check that x-auth exists in the response header
        expect(res.body._id).toExist(); // check that body exists in response
        expect(res.body.email).toBe(email); // check email matches expected email format &c.
      })
    //.end(done); // basic done to close test case
    .end((error) => { // expanded end to test case - check saved user details...
      // check for error with test case
      if (error) {
        return done(error); // simply return error to end test case
      }

      // if no error returned - check values saved
      User.findOne({email}).then((user) => { // find email saved in db
        expect(user).toExist(); // user should exist - saved in db
        expect(user.password).toNotBe(password); // password should not match password in db - hashed in db
        done();
      }).catch((error) => done(error));
    });
  });

  // test case - check email or password structure is invalid...
  it('should return error for invalid requests', (done) => {
    request(app)
      .post('/users')
      // send some poorly formed data - wrong email structure...
      .send({
        email: 'em237',
        password: 'abc123'
      })
      .expect(400) // should return a status code for the error
      .end(done); // call done to end test case
  });

  // test case - check email entered by user already exists in the DB
  it('should not create a new user as email already exists', (done) => {
    request(app)
      .post('/users')
      // send existing email from dummy data
      .send({
        email: users[0].email,
        password: 'abcd1234'
      })
      .expect(400) // should rerurn a status code of 400 for the error
      .end(done); // call done to end the test case
  });
});

// test POST route for /users/login
describe('POST /users/login', () => {
  // test case - user login with auth token response
  it('should login the user and response with auth token', (done) => {
    request(app)
      .post('/users/login')
      // send data from 2nd seed dummy user
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200) // should return a 200 status code for OK
      .expect((res) => {
        expect(res.headers['x-auth']).toExist(); // x-auth should be available in the response headers
      })
      .end((error, res) => { // add custom end - check for error and check user in db
        if (error) {
          return done(error); // return done for any errors
        }

        // if no errors - find user by id - user id from 2nd seed dummay user
        User.findById(users[1]._id).then((user) => {
          // check user tokens array includes at least the following properties
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((error) => done(error));
      });
  });

  // test case - invalid login - no user &c. found in db...
  // test case - invalid login - no user &c. found in db...
  it('should reject the user login due to invalid credentials...', (done) => {
    request(app)
      .post('/users/login')
      // send an invalid password to test validation...
      .send({
        email: users[1].email,
        password: 'password1234567'
      })
      .expect(400) // should return a 400 status code for error
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist(); // x-auth should not be available in the response headers
      })
      .end((error, res) => { // add custom end - check for error and check user in db
        if (error) {
          return done(error); // return done for any errors
        }

        // if no errors - find user by id - user id from 2nd seed dummay user
        User.findById(users[1]._id).then((user) => {
          // check user tokens array includes at least the following properties
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((error) => done(error));
      });
  });
});
