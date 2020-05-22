const express = require('express');
const app = express();
const path = require('path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.set('view engine', 'ejs');
app.set('views', 'views');
// here next is a function, used to call subsequent middlewares

// app.use((req, res, next) => {
//   console.log('In the function');
//   next();
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
