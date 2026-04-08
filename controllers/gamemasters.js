const GameMaster = require('../models/game-master');

module.exports.index = async (req, res) => {
    const gamemasters = await GameMaster.find({});
    res.render('gamemasters/index', { gamemasters });
};

module.exports.displayNewForm = (req, res) => {
    res.render('gamemasters/new');
};

module.exports.createGamemaster = async (req, res) => {
    const gm = new GameMaster(req.body.gm);
    gm.author = req.user._id;
    await gm.save();
    req.flash('success', 'Successfully listed new Game Master.');
    res.redirect(`/gamemasters/${gm._id}`);
};

module.exports.showGamemaster = async (req, res) => {
    const gm = await GameMaster.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(gm);
    if (!gm) {
        req.flash('error', 'No Game Master found.');
        return res.redirect('/gamemasters');
    }
    res.render('gamemasters/details', { gm });
};

module.exports.displayEditForm = async (req, res) => {
    const { id } = req.params;
    var gm = await GameMaster.findById(id);

    if (!gm) {
        req.flash('error', 'No Game Master found.');
        return res.redirect('/gamemasters');
    }

    res.render('gamemasters/edit', { gm });
};

module.exports.editGamemaster = async (req, res) => {
    const { id } = req.params;
    const gm = await GameMaster.findByIdAndUpdate(id, { ...req.body.gm });
    req.flash('success', 'Successfully updated Game Master listing.');
    res.redirect(`/gamemasters/${gm._id}`);
};

module.exports.deleteGamemaster = async (req, res) => {
    const { id } = req.params;
    const gm = await GameMaster.findByIdAndDelete(id);
    console.log(`Deleted ${gm.name}`);
    req.flash('success', 'Successfully deleted Game Master listing.');
    res.redirect('/gamemasters');
};