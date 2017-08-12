// require npm module - crypto-js for SHA256 hashing algorithm
const {SHA256} = require('crypto-js');

// define input string
var phraseInput = 'the heart of a star';
// hash string using crypto-js
var hashOutput = SHA256(phraseInput);

// console output phrase input
console.log(`Phrase input = ${phraseInput}`);
// console output hash object as string
console.log(`Hash output = ${hashOutput.toString()}`);

// simulate user data and return token - i.e. ID sent by user and return token for app usage
// user id
var data = {
  id: 7
};
// generated token for the id data - hash and salting
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'salted').toString()
}

// inject attempt to hack token hash to test validation on server
// token.data.id = 3;
// token.hash = SHA256(JSON.stringify(token.data).toString());

// then check user token hash and expected server token hash - including salt
// create expected token hash - hashed and salted
var serverHash = SHA256(JSON.stringify(token.data) + 'salted').toString();
// compare client and server token hash values
if (serverHash === token.hash) {
  console.log('token hash validated...');
} else {
  console.log('token hash did not validate...do not trust user');
}
