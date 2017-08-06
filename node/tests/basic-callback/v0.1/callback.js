/*
    basic-callback
    - callback.js
    - test basic callback usage
*/

/*
get a book by ID, and then use callback
- callback used once function has user ID passed

*/
var getBook = (id, callback) => {
    // book - usually will come from db or api query...dummy object for testing in this example
    var book = {
        book_isbn: id,
        title: "Hannibal's Footsteps"
    };
    /*
    call the callback we've passed as an argument
    - i.e. the function specified when getBook() is called...callback(book)
    - pass expected argument to callback function
        - e.g. book object
    - book object will now be output to console
    */
    callback(book);
};

/*
 call function with book id & function
  - function will run as book is returned...
  - e.g. book object returned from remote api query &c.
  - body of callback function is what works
    - e.g. output result to console, calculate something &c.
*/
getBook(270797, (book) => {
  // do something with return to the callback - e.g. book object
  console.log(book);
});
