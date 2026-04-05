const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const GameMasterSchema = new Schema({
    name: String,
    email: String,
    game: String,
    price: Number,
    bio: String,
    location: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

GameMasterSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

module.exports = mongoose.model('GameMaster', GameMasterSchema);