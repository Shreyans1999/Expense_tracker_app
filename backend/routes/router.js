const express = require('express');
const router = express.Router();
const UserController = require('../controller/User-controller');
const userAuthenticator = require('../middleware/auth');

router.post('/register-user', UserController.register);
router.post('/login-user', UserController.Login);
router.post('/add-expense', userAuthenticator.authenticator, UserController.AddExpense);
router.get('/get-expense', userAuthenticator.authenticator, UserController.ShowExpense);
router.delete('/delete-expense/:id', userAuthenticator.authenticator, UserController.DeleteExpense);

module.exports = router;
