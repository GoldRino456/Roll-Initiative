const User = require('../models/user');

module.exports.displayRegister = (req, res) => {
    res.render('users/register');
};

module.exports.createUser = async(req, res) => {
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
};

module.exports.displayLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    const redirectUrl = res.locals.returnTo || '/gamemasters';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', "Successfully signed out.");
        res.redirect('/gamemasters');
    });
};