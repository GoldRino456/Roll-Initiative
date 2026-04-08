const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require('../utilities/CatchAsync');
const { storeReturnTo } = require('../middleware');

router.get('/register', users.displayRegister);

router.post('/register', catchAsync(users.createUser));

router.get('/login', users.displayLogin);

router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login);

router.get('/logout', users.logout);

module.exports = router;