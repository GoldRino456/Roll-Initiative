const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameMasterSchema = new Schema({
    name: String,
    email: String,
    game: String,
    price: String,
    bio: String,
    location: String
});

module.exports = mongoose.model('GameMaster', GameMasterSchema);