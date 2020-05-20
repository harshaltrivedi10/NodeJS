const express = require('express');
const app = express();
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// here next is a function, used to call subsequent middlewares

// app.use((req, res, next) => {
//   console.log('In the function');
//   next();
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
});

app.listen(3000);
