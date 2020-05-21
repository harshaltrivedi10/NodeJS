const express = require('express');
const path = require('path');
const Router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');
// Router.get('/', (req, res, next) => {
//   // sending a response here!
//   res.send('<h1>Hello from Express!</h1>');
// });

Router.get('/', (req, res, next) => {
  // sending a response here!
  const products = adminData.products;
  res.render('shop', { props: products, pageTitle: 'Shop', path: '/' });
});

module.exports = Router;
