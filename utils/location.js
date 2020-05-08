require('dotenv').config()
const axios = require('axios');
const HttpError = require('../model/http-error');
const key = process.env.API_KEY;


const getCoordsForAddress = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
    const data = response.data;
    if(!data || data.status === 'ZERO_RESULTS') {
        return next(new HttpError('could not find location for specify address', 404))
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

module.exports = getCoordsForAddress