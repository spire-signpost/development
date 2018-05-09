/**
 * keys.js - basic logic for drawing abstracted patterns
 * add piano keys to canvas
 */

// define canvas
var canvas = document.getElementById('drawing');
// define context for drawing
var context = canvas.getContext('2d');
// define canvas width and height
var cHeight = canvas.height;
var cWidth = canvas.width;

var keyDetails = {
	total: 24,
	x: 30,
  y: 100,
  layout: {

  },
  white: {
		width: 30,
    height: 300,
	  fill: false,
		color: 'black'
	},
  black: {
		width: 15,
    height: 150,
		fill: true,
	  color: 'black'
	}
};

// MOVE TO PROTOTYPE - PARENT...
var two = ''; 
var three = ''; 
var zero = '';

// draw keys to canvas - white and black
function drawKeyboard(keys) {
	// iterate through keyDetails
  for (i = 0; i < keys.total; i++) {
		// draw white keys
    drawKeys(keys, 'white');
		drawBlackKeys(keys, 'black');
  }
}

function drawKeys(keys, type){
	// draw keys - colour = type parameter
	console.log('keys drawn = ' + type);
	let width = keys[type]['width'];
	let height = keys[type]['height'];
	// check fill boolean
  if (keys[type]['fill']) {
		context.fillStyle = keys[type]['color'];
		context.fillRect(keys['x']+(width*i), keys['y'], width, height);
	} else {
		context.strokeStyle = keys[type]['color'];
		context.strokeRect(keys['x']+(width*i), keys['y'], width, height);
  }
}

function drawBlackKeys(keys, type) {
	console.log('key no. = black ' + i);

  let width = keys[type]['width'];
	let height = keys[type]['height'];
	let keyX = keys['x']+(keys['white']['width']/2)+(width*i);

	if (three === 3) {
		two = 0;
		three = 0;
		zero = 0;
		console.log(two + '-' + three + '-' + zero)
	} else if (two === 2 && zero === 1) {
		three++;
		console.log('three = '+three + 'keyX = ' + keyX); 
		context.fillStyle = keys[type]['color'];
	 // context.fillRect(keyX, keys['y'], width, height);
	 context.fillRect(keys['x']+(keys['x']*(i+1))-width/2, keys['y'], width, height);
	} else if (two === 2) {
		zero = 1;
		console.log('zero = '+zero);
	} else {
		two++;
		console.log('two = '+two  + 'keyX = ' + keyX)
	  context.fillStyle = keys[type]['color'];
	  //context.fillRect(keyX, keys['y'], width, height);
		context.fillRect(keys['x']+(keys['x']*(i+1))-width/2, keys['y'], width, height);
	}
}

drawKeyboard(keyDetails);

/**
 * game play and control
 */

// add event listener for keypress - e.g. up arrow key...
window.addEventListener('click', function (event) {
	// get code for key presses
  var key = event.keyCode;
  console.log("key pressed = " + key);
  ball.userControl(key);
})
