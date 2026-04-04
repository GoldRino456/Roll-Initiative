const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/CatchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req, res) => {
    const {email, username, password} = req.body;

    try {
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.flash('success', 'You\'re in! Time to Roll Initiative!');
        res.redirect('/gamemasters');
    } 
    catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    res.redirect('/gamemasters');
});

module.exports = router;