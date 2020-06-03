const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pageNotFoundController = require('./controllers/404');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ed7b576861c3e4fdc8e0758')
    .then((user) => {
      // this is a sequelize object and not a JSON object
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundController.handle404);

mongoose
  .connect(
    'mongodb+srv://harshal:Tozindahotum10!@cluster0-2vfz0.mongodb.net/shop',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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
