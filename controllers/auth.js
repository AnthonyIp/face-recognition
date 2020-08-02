const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const database = require('../database');
const bcrypt = require('bcrypt-nodejs');
const db = require('../config/db');

/*
 @desc       Register user
 @route      POST /api/auth/register
 @access     Public
 */
exports.register = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password);

    // Validate email and password
    if (!name || !email || !password) {
        return next(new ErrorResponse(`Please provide an email and password`, 400));
    }

    db.transaction(trx => {
        trx.insert({
            hash : hash,
            email: email,
        })
           .into('login')
           .returning('email')
           .then(loginEmail => {
               return trx('users')
                   .returning('*')
                   .insert({
                       email : loginEmail[0],
                       name  : name,
                       joined: new Date()
                   })
                   .then(user => res.status(200).json(user[0]))
           })
           .then(trx.commit)
           .catch(trx.rollback)
    }).catch(err => next(new ErrorResponse(err, 400)));
});

/*
 @desc       Login user
 @route      POST /api/auth/signin
 @access     Public
 */
exports.signIn = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    // Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse(`Please provide an email and password`, 400));
    }

    db.select('email', 'hash').from('login')
      .where('email', '=', email)
      .then(data => {
          const isValid = bcrypt.compareSync(password, data[0].hash);
          if (isValid) {
              db.select('*').from('users')
                .where('email', '=', email)
                .then(users => res.status(200).json(users[0]))
                .catch(err => next(new ErrorResponse(`Something went wrong when getting user`, 401)));
          } else {
              return next(new ErrorResponse(`Invalid credentials`, 401));
          }
      })
      .catch(err => next(new ErrorResponse(`Invalid credentials`, 401)));

});

/*
 @desc       Log user out / clear cookie
 @route      GET /api/auth/logout
 @access     Private
 */
exports.logout = asyncHandler(async (req, res, next) => {

});

/*
 @desc       Display user profile
 @route      GET /api/auth/profile/:id
 @access     Private
 */
exports.profile = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    let found = false;

    db.select('*').from('users').where({id})
      .then(user => {
          if (user.length) {
              res.status(200).json(user[0]);
          } else {
              next(new ErrorResponse(`User not found`, 400))
          }
      })
      .catch(err => next(new ErrorResponse(`Something happens when trying to get user`, 400)))
});
