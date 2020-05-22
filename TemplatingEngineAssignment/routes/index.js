const express = require('express');
const Router = express.Router();

const users = [];

Router.get('/', (req, res) => {
  res.render('index', {
    path: '/',
    pageTitle: 'Index'
  });
});

Router.post('/', (req, res) => {
  users.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = Router;
exports.users = users;
