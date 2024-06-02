const express=require('express');
const Router =express.Router()
const UserControll=require('../controller/User-controller');

Router.post('/register-user',UserControll.register);

Router.post('/login-user/:email',UserControll.Login);

Router.post('/add-expense',UserControll.AddExpense);

Router.get('/get-expense',UserControll.ShowExpense);

Router.delete('/delete-expense/:id',UserControll.DeleteExpense)

module.exports=Router;