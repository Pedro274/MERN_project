const { Router } = require('express');
const {createPlaceValidation, updatePlaceValidation} = require('../validation/places_validators');

const router = Router();
const placesControllers = require('../controllers/places-controllers');

router.get('/', placesControllers.getAllPlaces);
router.get('/:id', placesControllers.getPlace);
router.post('/', createPlaceValidation, placesControllers.addNewPlace);
router.put('/:id', updatePlaceValidation, placesControllers.upDatePlace);
router.delete('/:id', placesControllers.deletePlace);
router.get('/user/:id', placesControllers.getUserPlace);

module.exports = router