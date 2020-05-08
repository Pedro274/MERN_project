// third party lib
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//local files
const httpErrorHandler = require('./controllers/httpError-controller');
const HttpError = require('./model/http-error');
const placesRoute = require('./routes/places-routes');
const userRoute = require('./routes/users-routes');

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());

app.use('/places', placesRoute);
app.use('/user', userRoute);

app.use((req, res, next) => next(new HttpError('Could not find this route', 404)));
app.use(httpErrorHandler);

// MongoDB connection
const mongoPassword = process.env.MONGO_DB_PASSWORD;
const mongoURL = `mongodb+srv://${mongoPassword}@cluster0-htwqm.mongodb.net/notebook?retryWrites=true&w=majority`;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => app.listen(PORT))
.catch((error) => console.log(error))
