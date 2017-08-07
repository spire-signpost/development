/*
    basic-async
    - async.js
    - test basic async local usage and pattern
*/

// initial app loading output to console
console.log('app starting...');

// accepts a callback and specified time delay
setTimeout(() => {
    console.log('output from first set timeout...2.5 seconds delay');
}, 2500);

// accepts a callback and specified time delay
setTimeout(() => {
    console.log('output from second set timeout...0 seconds delay');
}, 0);

// app stopping output to console
console.log('app stopping...')
