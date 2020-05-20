const express = require('express');
const path = require('path');
const Router = express.Router();

const rootDir = require('../util/path');

// Router.get('/', (req, res, next) => {
//   // sending a response here!
//   res.send('<h1>Hello from Express!</h1>');
// });

Router.get('/', (req, res, next) => {
  // sending a response here!
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = Router;
