const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/CatchAsync');
const ExpressError = require('../utilities/ExpressError');
const GameMaster = require('../models/game-master');
const { gameMasterSchema } = require('../schemas');

const validateGameMaster = (req, res, next) => {
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

router.get('/', catchAsync(async (req, res) => {
    const gamemasters = await GameMaster.find({});
    res.render('gamemasters/index', { gamemasters });
}));

router.get('/new', (req, res) => {
    res.render('gamemasters/new');
});

router.post('/', validateGameMaster, catchAsync(async (req, res) => {
    const gm = new GameMaster(req.body.gm);
    await gm.save();
    req.flash('success', 'Successfully listed new Game Master.');
    res.redirect(`/gamemasters/${gm._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const gm = await GameMaster.findById(req.params.id).populate('reviews');
    console.log(gm);
    if(!gm){
        req.flash('error', 'No Game Master found.');
        return res.redirect('/gamemasters');
    }
    res.render('gamemasters/details', { gm });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const gm = await GameMaster.findById(req.params.id);
    if(!gm){
        req.flash('error', 'No Game Master found.');
        return res.redirect('/gamemasters');
    }
    res.render('gamemasters/edit', { gm });
}));

router.put('/:id', validateGameMaster, catchAsync(async (req, res) => {
    const { id } = req.params;
    const gm = await GameMaster.findByIdAndUpdate(id, { ...req.body.gm });
    req.flash('success', 'Successfully updated Game Master listing.');
    res.redirect(`/gamemasters/${gm._id}`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const gm = await GameMaster.findByIdAndDelete(id);
    console.log(`Deleted ${gm.name}`);
    req.flash('success', 'Successfully deleted Game Master listing.');
    res.redirect('/gamemasters');
}));

module.exports = router;