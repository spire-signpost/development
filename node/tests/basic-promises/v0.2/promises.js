/*
  basic-promises - v0.2
  - promises.js
  - use promises instead of callbacks
  - submit query to remote api
  - working with Google Geocode API query
*/

// require request module
const request = require('request');

// get address from geocode api
var getAddress = (address) => {
    // return promise object - use promise constructor
    return new Promise((resolve, reject) => {
      /*
        define request to remote api - copied from v0.7 node-weather
      */
      // encode input from yargs to console
      const encodeAddress = encodeURIComponent(address);

      // call request function - pass options object and callback function for return...
      request({
          // set url for api query - append encoded user input address
          url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
          json: true
      }, (error, response, body) => {
        // add initial error handling for query and return object
        if (error) {
          // error object for query - call reject due to Promise
          reject('could not connect to remote servers...');
        } else if (body.status === 'ZERO_RESULTS') { // specific to Google API - check return property for other APIs
          // checks return status code for result - e.g. no results found - again, call reject due to Promise
          reject('Unable to find requested address...');
        } else if (body.status === 'OK') {// return comes back as OK...
          // call resolve due to Promise - return object with geocode data
          // undefined not needed - resolve and reject one parameter...
          resolve({
              address: body.results[0].formatted_address,
              locationType: body.results[0].geometry.location_type,
              latitude: body.results[0].geometry.location.lat,
              longitude: body.results[0].geometry.location.lng
          });
        }
      });

    })
};

getAddress('90210').then((location) => {
    console.log(location);
}, (error) => {
    console.log(error);
})
