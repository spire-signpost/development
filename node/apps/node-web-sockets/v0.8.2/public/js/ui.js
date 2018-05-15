/**
* ui.js - UI centric logic and code
*
**/

// create note form submit - event listener
$('#note-form').on('submit', (e) => {
  // stop default behaviour for event - i.e. page refresh for form submit
  e.preventDefault();
  console.log('create note form submitted...');

  var inputText = $('[name=note]');

  // emit data for new note to server...
  socket.emit('createNote', {
    author: 'amelie',
    text: inputText.val()
  }, () => {
    // clear value for message input field in form
    inputText.val('');
    console.log('clientCallback sent...');
  });

});
