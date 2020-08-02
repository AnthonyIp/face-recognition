const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'cb2d9d886fc54771929b68168ae831a9'
});

/*
 @desc       increment entries
 @route      PUT /api/user/image
 @access     Public
 */
exports.image = asyncHandler(async (req, res, next) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.status(200).json(entries[0]))
        .catch(err => next(new ErrorResponse(`unable to get entries`, 400)))
    ;
});

/*
 @desc       Register user
 @route      PUT /api/user/imageUrl
 @access     Public
 */
exports.imageUrl = asyncHandler(async (req, res, next) => {
    app.models
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => res.json(data))
       .catch(err => next(new ErrorResponse(`unable to get entries`, 400)));
});
