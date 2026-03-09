const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const GameMaster = require('./models/game-master');

mongoose.connect('mongodb://127.0.0.1:27017/roll-initiative') //Locally hosted db instance for now

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected.");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/gamemasters', async (req, res) => {
    const gamemasters = await GameMaster.find({});
    res.render('gamemasters/index', { gamemasters });
});

app.get('/gamemasters/new', (req, res) => {
    res.render('gamemasters/new');
});

app.post('/gamemasters', async (req, res) => {
    const gm = new GameMaster(req.body.gm);
    await gm.save();
    res.redirect(`/gamemasters/${gm._id}`);
});

app.get('/gamemasters/:id', async (req, res) => {
    const gm = await GameMaster.findById(req.params.id);
    res.render('gamemasters/details', { gm });
});

app.listen(3000, () => {
    console.log('Serving on port 3000.');
});