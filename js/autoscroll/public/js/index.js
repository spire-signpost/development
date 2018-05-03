/*
* Basic autoscroll - test autoscroll for vertical HTML rendering
* index.js
*/

// define time container for output
var timeContainer = document.getElementById('time-output');
var times = document.getElementById('times');
var notify = document.getElementById('notifications');

// data render and output - element name
function domRender(elemName, elemID='default', elemClass='default', elemText='default') {
  // set element container
  var element = document.createElement(elemName);
  // check passed element ID
  if (elemID != 'default') {
    element.setAttribute('id', elemID);
  }
  // check passed element class
  if (elemClass != 'default') {
    element.setAttribute('class', elemClass);
  }
  // check passed text
  if (elemText != 'default') {
    // create text node
    var elemContent = document.createTextNode(elemText);
    // add text node to element
    element.appendChild(elemContent);
  }
  // return constructed element, attributes, & content...
  return element;
}

// create timer output
function timer() {
    // get current date
    var currentDate = new Date();
    // get current time
    var currentTime = currentDate.getTime();
    // get current month
    var currentMonth = currentDate.getMonth();
    //document.getElementById("time-output").innerHTML = d.toLocaleTimeString();
    times.appendChild(domRender('li', undefined, 'current-time', currentTime));
    // scroll to foot of window output
    scrollToFoot();
}

// scroll to foot of window - timer output
function scrollToFoot() {
  // selector - get last element in #times
  var newTime = times.lastChild;
  // heights
  var clientHeight = times.clientHeight;
  var scrollTop = times.scrollTop;
  var scrollHeight = times.scrollHeight;

  // get last time height
  var newTimeHeight = newTime.clientHeight;
  // get penultimate time height
  var penulTimeHeight = newTime.previousSibling.clientHeight;

  //console.log(clientHeight + ' - ' + scrollTop + ' - ' + scrollHeight + ' - ' + newTimeHeight);
  //console.log(penulTimeHeight);

  // update scrollTop to scrollHeight as times are output at bottom of element...top will not scroll
  if (clientHeight + scrollTop + newTimeHeight + penulTimeHeight >= scrollHeight) {
    console.log('scroll...');
    // update value for property scrollTop - element updates to show new time if user at bottom of scroll...
    times.scrollTop = scrollHeight;
  }
}

document.getElementById('add-time').addEventListener('click', function() {
  timer();
});

document.getElementById('scroll-top').addEventListener('click', function() {
  times.scrollTop = 10;
});
