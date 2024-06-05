const { Sequelize } = require('sequelize');
const sq = require('../util/database');
const Expense = require('./expense'); // Import the Expense model

const User = sq.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Define associations
User.hasMany(Expense, { foreignKey: 'UserId' });
Expense.belongsTo(User, { foreignKey: 'UserId' });

module.exports = User;
