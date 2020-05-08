const {check} = require('express-validator');

const createPlaceValidation = [
    check('title').notEmpty().withMessage('request body most contain title'),
    check('description').isLength({min: 5}),
    check('address').not().isEmpty(),
    check('creator').notEmpty().withMessage('request body most contain creator id')
]

const updatePlaceValidation = [
    check('title').not().isEmpty().withMessage('Request body most contain title'),
    check('description').isLength({min: 5}).withMessage('Request body most contain a description')
]


module.exports = {
    createPlaceValidation,
    updatePlaceValidation
}