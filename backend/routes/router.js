const express = require('express');
const Router = express.Router();
const UserController = require('../controller/User-controller');

Router.post('/register-user', UserController.register);
Router.post('/login-user', UserController.login);
Router.post('/add-expense', UserController.addExpense);
Router.get('/get-expense', UserController.showExpense);
Router.delete('/delete-expense/:id', UserController.deleteExpense);

module.exports = Router;
