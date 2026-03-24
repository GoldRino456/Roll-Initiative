const Joi = require('joi');

module.exports.gameMasterSchema = Joi.object({
    gm: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        game: Joi.string().required(),
        price: Joi.number().min(0).required(),
        bio: Joi.string(),
        location: Joi.string().required(),
        image: Joi.string().uri()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    }).required()
});