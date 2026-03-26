const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/CatchAsync');
const ExpressError = require('../utilities/ExpressError');
const GameMaster = require('../models/game-master');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas')

const validateReview = (req, res, next) => {
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

router.post('/', validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    const gm = await GameMaster.findById(id);
    const newReview = new Review(review);
    gm.reviews.push(newReview);
    await newReview.save();
    await gm.save();
    req.flash('success', 'Successfully created review.');
    res.redirect(`/gamemasters/${gm._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await GameMaster.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review.');
    res.redirect(`/gamemasters/${id}`);
}));

module.exports = router;