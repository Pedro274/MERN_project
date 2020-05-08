const uuid = require('uuid')
const {validationResult} = require('express-validator')

const HttpError = require('../model/http-error');

const users = [{
    id: '23',
    name: 'Pedro',
    email: 'Pedro@gmail.com',
    password: 'asdf'
}]

const getUsers = (req, res, next) => {
    if(!users){return next(new HttpError('No Users available', 404))};
    res.json({users});
}

const signUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.errors)
    }
    const {name, email, password} = req.body;
    const userEmail = users.find(user => user.email === email);
    if(userEmail){return next(new HttpError('Sorry username already exists'))};
    const newUser = {
        id: uuid.v4(),
        name,
        email,
        password
    }
    users.push(newUser)
    res.status(201).json({message: 'new user was created'})
};

const login = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json(errors.errors)
    }
    const {email, password} = req.body;
    const IdentifyUser = users.find(user => user.email === email);
    if(!IdentifyUser || IdentifyUser.password !== password) {
        return next(new HttpError('Could not Identify user, credentials seem to be wrong.', 404)) 
    };
    res.status(200).json(IdentifyUser)
};



module.exports = {
    getUsers: getUsers,
    signUp: signUp,
    login: login
}