/**
 * interact.js - basic logic for interacting with a shape
 * add keyboard control to click a shape on the canvas
 */

// define canvas
var canvas = document.getElementById('drawing');
// define context for drawing
var context = canvas.getContext('2d');
// define canvas width and height
var cHeight = canvas.height;
var cWidth = canvas.width;
// define game blocks
// var keyDetails = [
// 	3,
//   {
// 		x: 25,
// 		y: 100,
// 		width: 20,
//     height: 250,
// 		style: false,
// 		color: 'black',
// 		type: 'white'
// 	},
//   {
// 		x: 35,
// 		y: 100,
// 		width: 20,
//     height: 125,
// 		style: true,
// 		color: 'black',
// 		type: 'black'
// 	}
// ];

// var keyDetails = {
// 	keys: 10,
// 	x: 25,
//   y: 100,
// 	KEY ORDER FOR WHITE AND BLACK KEYS...
// 	[
//     {
// 		  width: 20,
//       height: 250,
// 		  style: false,
// 		  color: 'black',
// 		  type: 'white'
// 	  },
//     {
// 		  width: 20,
//       height: 125,
// 		  style: true,
// 		  color: 'black',
// 		  type: 'black'
// 	  }
// 	]
// };

// draw keys to canvas - no. of keys = keys[0]
function drawKeys(keys) {
	// iterate through blocks
  for (i = 1; i < keys[0]; i++) {
		if (keys[i]['style']) {
		  context.fillStyle = keys[i]['color'];
	    context.fillRect(keys[i]['x'], keys[i]['y'], keys[i]['width'], keys[i]['height']);
		} else {
			console.log(i + ' = ' + keys[i]['color']);
			context.strokeStyle = keys[i]['color'];
	    context.strokeRect(keys[i]['x'], keys[i]['y'], keys[i]['width'], keys[i]['height']);
		}
  }
}

/*
- total no. of keys (e.g. 24)
- start x and y for white keys
- properties of white and black keys
  - width & height
  - fill or stroke style
  - colour
- pattern of white and black keys
  - 2, 3, 2, 3, ...
*/


drawKeys(keyDetails);

// /**
//  * pin ball
//  */

// // ball constructor - name capitalised to denote constructor
// function Ball() {
//  this.x = cWidth/2;
//  this.y = cHeight-10;
// }

// // 1. update prototype - method to draw ball
// Ball.prototype.draw = function () {
//  circle(this.x, this.y, 10, true, 'green');
// };

// // 2. update prototype -method to move a ball
// Ball.prototype.move = function () {
// // update position of ball based on speed
//  this.x += this.xSpeed;
//  this.y += this.ySpeed;

// var check = ball.checkCollision(blockDetails);
//    if (check) {
//      console.log('move collision = true & ' + check.x);
//     this.x = check.x-15; // left side collision bounce back...
//    }

// // check ball relative to boundaries - canvas edge
//   if (this.x < 0) {
// 	  this.x = cWidth;
//   } else if (this.x > cWidth) {
// 	  this.x = 0;
//   } else if (this.y < 0) {
// 	  this.y = cHeight;
//   } else if (this.y > cHeight) {
//     this.y = 0;
//   }

//  console.log(`x = ` + this.x + ', y = ' + this.y);
// };

// // 3. update prototype - check collision
// Ball.prototype.checkCollision = function ( blocks ) {
//   // iterate through blocks and check collision
// 	for (i = 0; i < blocks.length; i++) {
// 		// start start and end of block - x & y axis
// 		let blockStartX = blocks[i]['x'];
// 		let blockEndX = (blocks[i]['x'] + blocks[i]['width']);
// 		let blockStartY = blocks[i]['y'];
// 		let blockEndY = (blocks[i]['y'] + blocks[i]['height']);
// 		// check block collisions - allow for radius of ball
// 		if (this.x >= blockStartX-5 && this.x <= blockEndX+5 && this.y >= blockStartY-5 && this.y <= blockEndY+5) {
//       var collisionDetails = {
//         collision: true,
//         x: this.x,
//         y: this.y
//       };
// 			console.log('collision at block = ' + collisionDetails);
//       return collisionDetails;
// 		}
//   }
// }

// // 4. update prototype - user control
// Ball.prototype.userControl = function( key ) {
//   /*
// 	* 37 = LEFT
// 	* 38 = UP
// 	* 39 = RIGHT
// 	* 40 = DOWN
// 	*/
//   if (key === 37) {
// 		ball.userMove(-15, 0);
//   } else if (key === 38) {
// 		ball.userMove(0, -15);
// 	} else if (key === 39) {
// 		ball.userMove(15, 0);
// 	} else if (key === 40) {
// 		ball.userMove(0, 15);
// 	}
// };

// // 5. update prototype - user movement of ball
// Ball.prototype.userMove = function (xS, yS) {
// 	// clear canvas for animation
// 	context.clearRect(0, 0, cWidth, cHeight);
// 	// draw blocks to canvas
//   drawBlocks(blockDetails);
//   // update x and y speed
// 	this.xSpeed = xS;
//   this.ySpeed = yS;
// 	// draw ball and move...
//   ball.move();
// 	ball.draw();
//   //ball.checkCollision(blockDetails);
// }

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
