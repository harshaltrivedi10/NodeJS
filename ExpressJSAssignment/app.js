const express = require('express');

const app = express();

// app.use('/temp', (req, res, next) => {
//   console.log('Temp');
//   res.send('<h1>Temp</h1>');
// });

// app.use('/temp2', (req, res, next) => {
//   console.log('Temp2');
//   res.send('<h1>Temp 2</h1>');
// });

app.use('/users', (req, res, next) => {
  console.log('Users');
  res.send('<h1>Users</h1>');
  next();
});

app.use('/', (req, res, next) => {
  console.log('Temp');
  res.send('/');
});

app.listen(3000);
