const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const pageNotFoundController = require('./controllers/404');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://harshal:Tozindahotum10!@cluster0-2vfz0.mongodb.net/shop';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(pageNotFoundController.handle404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Harshal',
          email: 'h@h.com',
          cart: { items: [] }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
