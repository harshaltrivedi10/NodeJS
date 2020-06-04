const express = require('express');
const Router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

//  /admin/add-product => GET
Router.get('/add-product', isAuth, adminController.getAddProduct);

// //  /admin/add-product => POST
Router.post('/add-product', isAuth, adminController.postAddProduct);

// // /admin/products
Router.get('/products', isAuth, adminController.getProducts);

Router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

Router.post('/edit-product', isAuth, adminController.postEditProduct);

Router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = Router;
