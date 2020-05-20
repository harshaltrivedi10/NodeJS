const path = require('path');
const express = require('express');
const Router = express.Router();
const rootDir = require('../util/path');
Router.get('/users', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

module.exports = Router;
