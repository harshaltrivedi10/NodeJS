const express = require('express');
const Router = express.Router();
const indexData = require('./index');

Router.get('/users', (req, res) => {
  const users = indexData.users;
  res.render('users', {
    users: users,
    pageTitle: 'users',
    path: '/users'
  });
});

module.exports = Router;
