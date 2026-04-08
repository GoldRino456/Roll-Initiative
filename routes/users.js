const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require('../utilities/CatchAsync');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.displayRegister)
    .post(catchAsync(users.createUser));

router.route('/login')
    .get(users.displayLogin)
    .post(
        storeReturnTo, 
        passport.authenticate('local', 
            { 
                failureFlash: true, 
                failureRedirect: '/login' 
            }), 
        users.login
    );

router.get('/logout', users.logout);

module.exports = router;