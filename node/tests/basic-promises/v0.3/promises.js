/*
  basic-promises - v0.3
  - promises.js
  - use promises instead of callbacks
  - promise chain to query remote apis
    - use geocode api data to query weather api
*/

// require request module
const request = require('request');

// Promise - get address from geocode api & return promise object
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

// Promise - get address from geocode api & return promise object
var getWeather = (lat, lng) => {
  // return promise object - use promise constructor
  return new Promise((resolve, reject) => {
    // request - options parameter and callback for return data
    request({
        url: `https://api.darksky.net/forecast/add_your_dev_key/${lat},${lng}`,
        json: true // request parses body as json...
    }, (error, response, body) => {
        if (error) {
            //console.log('unable to connect to weather api...');
            reject('unable to connect to weather api...');
        } else if (response.statusCode === 404) {
            //console.log('unable to fetch weather forecast...');
            reject('unable to fetch weather forecast...');
        } else if (response.statusCode === 200){
            //console.log(body.currently.temperature);
            resolve({
                temperature: body.currently.temperature,
                apparentTemp: body.currently.apparentTemperature
            });
        }
      });
  });
};

// call get Address first, and then use return data in promise to get weather from api...
getAddress('nice, france').then((res) => {
  console.log('Geocode: ', res);
  //get weather data - pass data from geocode promise
  return getWeather(res.latitude, res.longitude);
}).then((res) => {
  console.log('Weather:', res);
})
.catch((errorOutput) => {
  console.log(errorOutput);
});
