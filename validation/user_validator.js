const { check} = require('express-validator')

const signUpUserValidator = [
    check('name').notEmpty().withMessage('Provide user name in order to create a profile'),
    check('email').isEmail().withMessage('Provide valid email in order to create a profile'),
    check('password').notEmpty().withMessage('Please provide a password to create account'),
]

const loginUserValidator = [
    check('email').notEmpty().withMessage('Please provide email to login'),
    check('password').notEmpty().withMessage('Please provide password to login')
]

module.exports = {
    signUpUserValidator,
    loginUserValidator
}