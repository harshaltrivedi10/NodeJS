const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodeMailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.getLogin = (req, res, next) => {
  //   console.log(req.get('Cookie'));
  //   const isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then((passwordsMatch) => {
          if (passwordsMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            // save is called to ensure that session has been created
            return req.session.save((error) => {
              console.log(error);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch((error) => {
          console.log(error);
          res.redirect('/login');
        });
      // this is a sequelize object and not a JSON object
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
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          'error',
          'Email already in use, please sign up using a different email or login using the current email.'
        );
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then((result) => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'diehardmessian@gmail.com',
            subject: 'Successfull Signup',
            html: '<h1>You have successfully signed up!</h1>'
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};
