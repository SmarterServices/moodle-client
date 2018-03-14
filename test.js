'use strict';

const Client = require('./index');

const client = new Client({
  host: '',
  wstoken: ''
});


client
  .getLtisByCourse({courseId: 1})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err.message);
  });
