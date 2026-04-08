const express = require('express');
const router = express.Router();
const gamemasters = require('../controllers/gamemasters');
const catchAsync = require('../utilities/CatchAsync');
const { isLoggedIn, isAuthor, validateGameMaster } = require('../middleware');

router.route('/')
    .get(catchAsync(gamemasters.index))
    .post(
        isLoggedIn, 
        validateGameMaster, 
        catchAsync(gamemasters.createGamemaster));

router.get('/new', isLoggedIn, gamemasters.displayNewForm);

router.route('/:id')
    .get(catchAsync(gamemasters.showGamemaster))
    .put(
        isLoggedIn, 
        isAuthor, 
        validateGameMaster, 
        catchAsync(gamemasters.editGamemaster))
    .delete(
        isLoggedIn, 
        isAuthor, 
        catchAsync(gamemasters.deleteGamemaster));

router.get('/:id/edit', 
    isLoggedIn, 
    isAuthor, 
    catchAsync(gamemasters.displayEditForm));

module.exports = router;