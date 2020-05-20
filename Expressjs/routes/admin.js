const express = require('express');
const path = require('path');
const Router = express.Router();
const rootDir = require('../util/path');

//  /admin/add-product => GET
Router.get('/add-product', (req, res, next) => {
  // sending a response here!
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

//  /admin/add-product => POST
Router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = Router;
