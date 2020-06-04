const express = require('express');
const Router = express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');
// Router.get('/', (req, res, next) => {
//   // sending a response here!
//   res.send('<h1>Hello from Express!</h1>');
// });

Router.get('/', shopController.getIndex);
Router.get('/products', shopController.getProducts);
Router.get('/products/:productId', shopController.getProduct);
Router.get('/cart', isAuth, shopController.getCart);
Router.post('/cart', isAuth, shopController.postCart);
Router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
Router.get('/orders', isAuth, shopController.getOrders);
Router.post('/create-order', isAuth, shopController.postOrder);
// Router.get('/checkout', shopController.getCheckout);

module.exports = Router;
