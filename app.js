const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const sendResponse = require('./helpers/sendResponse');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//Mongo connect
require("./mongoConfig")

app.use('/api', indexRouter);
app.use((req, res, next) => {
    const error = new Error("wrong url")
    error.statusCode = 404
    next(error)
});

app.use((err, req, res, next) => {
    if(err.statusCode){
        return sendResponse(res, err.statusCode, false, null, true, "url not found")
    }else{
        return sendResponse(res, 500, false,  null, err.message, "internal server error")
    }
    }
)

module.exports = app;
