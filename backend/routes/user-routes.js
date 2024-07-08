const express=require('express');
const Router =express.Router()
const UserControll=require('../controller/User-controller');
const userAuthenticator=require('../middleware/auth');

Router.post('/register-user',UserControll.register);

Router.post('/login-user/:email',UserControll.Login);


module.exports=Router;