/**
 * keys-proto.js - basic logic for drawing abstracted patterns
 * add piano keys to canvas - prototype usage
 * v0.2
 */

// define canvas
var canvas = document.getElementById('drawing');
// define context for drawing
var context = canvas.getContext('2d');
// define canvas width and height
var cHeight = canvas.height;
var cWidth = canvas.width;

// TEST: temporary object for test of keyDetails...
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

/*
* keyboard - prototype extension
*/

// PARENT: constructor for keyboard
function Keyboard(keyDetails) {
	// destructure properties for keyboard - keyDetails object defined by user
  ({
		total: this.total,
    x: this.x,
    y: this.y,
    white: this.white,
    black: this.black
	 } = keyDetails
  );

  // properties for instantiated object - black key counters
	this.two = 0;
	this.three = 0;
	this.zero = 0;

}

// PROTO: draw keyboard - use constructor properties for keyboard
Keyboard.prototype.draw = function() {
  // draw keyboard keys - iterate through each key
  for (i = 0; i < this.total; i++) {
		// draw white keys
		this.drawKeys('white');
		// draw black keys
		this.drawKeys('black');
  }
}

// PROTO: draw keys
Keyboard.prototype.drawKeys = function(type) {
	// properties for keys - ABSTRACT TO OBJECT (???)
	let width = this[type]['width'];
	let height = this[type]['height'];
	let color = this[type]['color'];
	let x = this['x'];
	let y = this['y']

	//check key type
	if (type === 'white') { // TYPE: white keys
		// check fill boolean
  	if (this[type]['fill']) {
			context.fillStyle = color;
			context.fillRect(x + (width*i), y, width, height); // ABSTRACT PARAMS (???)
		} else {
			context.strokeStyle = color;
			context.strokeRect(x + (width*i), y, width, height);
  	}
	} else { // TYPE: black keys
		// black key specific properties
		let blackKeyX = x+(this['white']['width']/2)+(width*i); // black key relative to white

		// check sequence of black keys relative to white = 2,0,3,0...
		if (this.three === 3) {
			// RESET: key counters
			this.two = 0;
			this.three = 0;
			this.zero = 0;
			console.log(this.two + '-' + this.three + '-' + this.zero);
		} else if (this.two === 2 && this.zero === 1) {
			// INCREMENT: three key counter
			this.three++;
			console.log('three = ' + this.three + 'keyX = ' + blackKeyX);
			context.fillStyle = this[type]['color'];
		  context.fillRect(x+(x*(i+1))-width/2, y, width, height);
		} else if (this.two === 2) {
      // SET: no key rendered - zero set to 1
			this.zero = 1;
			console.log('zero = ' + this.zero);
		} else {
      // INCREMENT: two key counter
			this.two++;
			console.log('two = ' + this.two  + 'keyX = ' + blackKeyX)
		  context.fillStyle = this[type]['color'];
			context.fillRect(x+(x*(i+1))-width/2, y, width, height);
		}

	}

}

// PROTO: listen for click on key
Keyboard.prototype.clickKey = function() {

}

// PROTO: play sound per key
Keyboard.prototype.playKey = function() {

}

var keyboard = new Keyboard(keyDetails);

//console.log(keyboard.white);
keyboard.draw();
