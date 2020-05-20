const express = require('express');
const usersRoute = require('./routes/users');
const indexRoute = require('./routes/index');
const rootDir = require('./util/path');
const path = require('path');

const app = express();
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(usersRoute);
app.use(indexRoute);

app.listen(5000);
