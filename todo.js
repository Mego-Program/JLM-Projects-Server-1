  fetch('http://localhost:8137/todos')
  .then(response => response.json())
  .then(data => {

    console.log('To-do List JSON:', JSON.stringify(data));
  })
  .catch(error => {
    console.error('Error:', error);
    console.log("llllllllllllllllllllllllllllll")
  });