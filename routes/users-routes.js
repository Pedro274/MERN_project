const express = require('express');

const userRoutes = require('../controllers/user-controllers');
const {signUpUserValidator, loginUserValidator} = require('../validation/user_validator');

const route = express.Router();

route.get('/', userRoutes.getUsers);;
route.post('/signup', signUpUserValidator, userRoutes.signUp);
route.get('/login', loginUserValidator, userRoutes.login);

module.exports = route