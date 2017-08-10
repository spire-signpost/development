/*
  basic-promises - v0.1
  - promises.js
  - chain promise methods - then and catch
*/

// define function to return promise object - simple multiply
var asyncTimes = (numA, numB) => {
  // return promise object - pass expected parameters for resolve and reject
  return new Promise((resolve, reject) => {
    if (typeof numA == 'number' && typeof numB === 'number') {
      // resolve promise
      resolve(numA * numB);
    } else {
      // reject promise
      reject('Each argument must be a number to calculate...');
    }
  });
};

/*
  test promise function
  - chain promise methods
  - `then` works with return from promise
  - `catch` works with errors from promise
*/
asyncTimes(3, 6).then((res) => {
  console.log(`promise return value = ${res}`);
}).catch((errorOutput) => {
  console.log(errorOutput);
});
