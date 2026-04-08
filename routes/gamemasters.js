const express = require('express');
const router = express.Router();
const gamemasters = require('../controllers/gamemasters');
const catchAsync = require('../utilities/CatchAsync');
const { isLoggedIn, isAuthor, validateGameMaster } = require('../middleware');



router.get('/', catchAsync(gamemasters.index));

router.get('/new', isLoggedIn, gamemasters.displayNewForm);

router.post('/', isLoggedIn, validateGameMaster, catchAsync(gamemasters.createGamemaster));

router.get('/:id', catchAsync(gamemasters.showGamemaster));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(gamemasters.displayEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateGameMaster, catchAsync(gamemasters.editGamemaster));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(gamemasters.deleteGamemaster));

module.exports = router;