const express = require('express');
const Router = express.Router();
const adminController = require('../controllers/admin');

//  /admin/add-product => GET
Router.get('/add-product', adminController.getAddProduct);

//  /admin/add-product => POST
Router.post('/add-product', adminController.postAddProduct);

// /admin/products
Router.get('/products', adminController.getProducts);

module.exports = Router;
