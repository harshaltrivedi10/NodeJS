const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('nodejs-application', 'root', 'Lionelmessi1!', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
