const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameMasterSchema = new Schema({
    name: String,
    email: String,
    game: String,
    price: Number,
    bio: String,
    location: String,
    image: String
});

module.exports = mongoose.model('GameMaster', GameMasterSchema);