const express = require('express');
const path = require('path');
const app = express();
const indexData = require('./routes/index');
const userData = require('./routes/users');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexData.routes);
app.use(userData);

app.listen(3000);
