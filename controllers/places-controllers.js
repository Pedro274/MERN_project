//third party lib
require('dotenv').config();
const {validationResult} = require('express-validator');

// local files
const HttpError = require('../model/http-error');
const Places = require('../model/place-model');
const getCoordinates = require('../utils/location');


const createNewPlace = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const message = error.errors[0]
        return res.status(422).json({
            message
        })
    };

    try {
        const {
            title,
            description,
            address,
            creator
        } = req.body;
        const coordinates = await getCoordinates(address);
        const newPlace = new Places({
            title,
            description,
            location: coordinates,
            address,
            creator
        })
        await newPlace.save()
        res.status(201).json({
            message: 'New place was created',
            place: newPlace
        })
    } catch (error) {
        return next(error)
    }
}

const returnAllPlaces = async (req, res, next) => {
    try {
        const allPlaces = await Places.find();
        res.status(200).json({places: allPlaces.map(place => place.toObject({getters: true}))})
    } catch (error) {
        return next(new HttpError('Something went wrong', 500))
    }
}

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.id;
    try {
        const place = await Places.findById(placeId);
        if (!place) return next(new HttpError('Could not find a place for the provider id', 404))
        res.status(200).json(place.toObject({getters: true}))
    } catch (error) {
        return next( new HttpError('Something went wrong please check id input'))
    }
}

const updatePlaceById = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) return res.status(422).json({
        message: error.errors
    })

    try {
        const placeId = req.params.id;
        const placeToUpdate = await Places.findById(placeId);
        if (!placeToUpdate) return next(new HttpError('Place does not exists'));

        const {title, description} = req.body;
        placeToUpdate.title = title;
        placeToUpdate.description = description;
        await placeToUpdate.save()

        res.status(201).json({message: 'Place was updated', placeToUpdate})
    } catch (error) {
        console.log(error)
        return next (new HttpError('Something went wrong please check id input'))
    }
}

const deletePlaceById = async(req, res, next) => {
    const placeId = req.params.id;
    try {
        const place = await Places.findById(placeId);
        if(!place) return next(new HttpError('Sorry place does not exists'));
        await place.remove()
        res.status(200).json({
        message: "Place was deleted"
    });
    } catch (error) {
        return next(new HttpError('Something went wrong please check id and try again'))
    }
}

const getPlacesByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userPlaces = await Places.find({creator: userId});
        console.log(userPlaces)
        if (!userPlaces) return next(new HttpError('Could not find places with user id', 404))
        res.status(200).json({places: userPlaces.map(place => place.toObject({getters: true}))})
    } catch (error) {
        return next( new HttpError('Something went wrong please check user id and try again'))
    }
}


module.exports = {
    addNewPlace: createNewPlace,
    getPlace: getPlaceById,
    upDatePlace: updatePlaceById,
    deletePlace: deletePlaceById,
    getUserPlace: getPlacesByUserId,
    getAllPlaces: returnAllPlaces
}