const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const games = require('./games');
const GameMaster = require('../models/game-master');

mongoose.connect('mongodb://127.0.0.1:27017/roll-initiative') //Locally hosted db instance for now

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected.");
});

const seedDB = async () => {
    await GameMaster.deleteMany({});

    for(let i = 0; i < 100; i++) {
        const randGameIdx = Math.floor(Math.random() * games.length);
        const randFirstName = faker.name.firstName();
        const randLastName = faker.name.lastName();

        const gm = new GameMaster({
            name: `${randFirstName} ${randLastName}`,
            email: faker.internet.exampleEmail(randFirstName, randLastName),
            game: `${games[randGameIdx]}`,
            price: faker.finance.amount(0, 100, 2, '$'),
            bio: faker.lorem.sentences(),
            location: faker.address.cityName()
        })

        await gm.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});