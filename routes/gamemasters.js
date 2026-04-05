const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/CatchAsync');
const GameMaster = require('../models/game-master');
const { isLoggedIn, isAuthor, validateGameMaster } = require('../middleware');



router.get('/', catchAsync(async (req, res) => {
    const gamemasters = await GameMaster.find({});
    res.render('gamemasters/index', { gamemasters });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('gamemasters/new');
});

router.post('/', isLoggedIn, validateGameMaster, catchAsync(async (req, res) => {
    const gm = new GameMaster(req.body.gm);
    gm.author = req.user._id;
    await gm.save();
    req.flash('success', 'Successfully listed new Game Master.');
    res.redirect(`/gamemasters/${gm._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const gm = await GameMaster.findById(req.params.id).populate('reviews').populate('author');
    console.log(gm);
    if(!gm){
        req.flash('error', 'No Game Master found.');
        return res.redirect('/gamemasters');
    }
    res.render('gamemasters/details', { gm });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    var gm = await GameMaster.findById(id);

    if(!gm)
    {
        req.flash('error', 'No Game Master found.');
        return res.redirect('/gamemasters');
    }

    res.render('gamemasters/edit', { gm });
}));

router.put('/:id', isLoggedIn, isAuthor, validateGameMaster, catchAsync(async (req, res) => {
    const { id } = req.params;
    const gm = await GameMaster.findByIdAndUpdate(id, {...req.body.gm});
    req.flash('success', 'Successfully updated Game Master listing.');
    res.redirect(`/gamemasters/${gm._id}`);
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const gm = await GameMaster.findByIdAndDelete(id);
    console.log(`Deleted ${gm.name}`);
    req.flash('success', 'Successfully deleted Game Master listing.');
    res.redirect('/gamemasters');
}));

module.exports = router;