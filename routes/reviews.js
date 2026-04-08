const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const catchAsync = require('../utilities/CatchAsync');
const { isLoggedIn, validateReview, isReviewer } = require('../middleware');



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewer, catchAsync(reviews.deleteReview));

module.exports = router;