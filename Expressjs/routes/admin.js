const express = require('express');
const path = require('path');
const Router = express.Router();
const rootDir = require('../util/path');

const products = [];

//  /admin/add-product => GET
Router.get('/add-product', (req, res, next) => {
  // sending a response here!
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
});

//  /admin/add-product => POST
Router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = Router;
exports.products = products;
