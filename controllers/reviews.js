const GameMaster = require('../models/game-master');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    const gm = await GameMaster.findById(id);
    const newReview = new Review(review);
    newReview.author = req.user._id;
    gm.reviews.push(newReview);
    await newReview.save();
    await gm.save();
    req.flash('success', 'Successfully created review.');
    res.redirect(`/gamemasters/${gm._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await GameMaster.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review.');
    res.redirect(`/gamemasters/${id}`);
};