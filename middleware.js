const ExpressError = require('./utilities/ExpressError');
const GameMaster = require('./models/game-master');
const Review = require('./models/review');
const { gameMasterSchema, reviewSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to do that!');
        return res.redirect('/login');
    }
    next();
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    var gm = await GameMaster.findById(id);
    if (!gm.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to access that!');
        return res.redirect(`/gamemasters/${id}`);
    }

    next();
};

module.exports.validateGameMaster = (req, res, next) => {
    const { error } = gameMasterSchema.validate(req.body);
    if(error) {
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400);
    }
    else
    {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400);
    }
    else
    {
        next();
    }
};