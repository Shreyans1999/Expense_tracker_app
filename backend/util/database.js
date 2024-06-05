const { Sequelize } = require('sequelize');
const sq = new Sequelize('expense', 'root', 'root', { 
  dialect: 'mysql', 
  host: "localhost"
});
module.exports = sq;
