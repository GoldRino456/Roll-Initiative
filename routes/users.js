const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/CatchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req, res) => {
    const {email, username, password} = req.body;

    try {
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, err => {
            if(err)
            {
                return next(err);
            }
            req.flash('success', 'You\'re in! Time to Roll Initiative!');
            res.redirect('/gamemasters');
        });
    } 
    catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    const redirectUrl = res.locals.returnTo || '/gamemasters';
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', "Successfully signed out.");
        res.redirect('/gamemasters');
    });
});

module.exports = router;