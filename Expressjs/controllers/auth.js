const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  //   console.log(req.get('Cookie'));
  //   const isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5ed7b576861c3e4fdc8e0758')
    .then((user) => {
      // this is a sequelize object and not a JSON object
      req.session.isLoggedIn = true;
      req.session.user = user;
      // save is called to ensure that session has been created
      req.session.save((error) => {
        console.log(error);
        res.redirect('/');
      });
    })
    .catch((error) => console.log(error));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postSignup = (req, res, next) => {};
