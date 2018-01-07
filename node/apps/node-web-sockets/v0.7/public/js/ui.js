/**
* ui.js - UI centric logic and code
*
**/

// create note form submit - event listener
$('#note-form').on('submit', (e) => {
  // stop default behaviour for event - i.e. page refresh for form submit
  e.preventDefault();
  console.log('create note form submitted...');
  // emit data for new note to server...
  socket.emit('createNote', {
    author: 'amelie',
    text: $('[name=note]').val()
  }, () => {
    
  });

});
