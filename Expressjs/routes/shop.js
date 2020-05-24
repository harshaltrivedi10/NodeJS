const express = require('express');
const Router = express.Router();
const shopController = require('../controllers/shop');
// Router.get('/', (req, res, next) => {
//   // sending a response here!
//   res.send('<h1>Hello from Express!</h1>');
// });

Router.get('/', shopController.getIndex);
Router.get('/products', shopController.getProducts);
Router.get('/products/:productId', shopController.getProduct);
Router.get('/cart', shopController.getCart);
Router.post('/cart', shopController.postCart);
Router.get('/orders', shopController.getOrders);
Router.get('/checkout', shopController.getCheckout);

module.exports = Router;
