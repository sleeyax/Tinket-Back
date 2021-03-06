const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moderate = require('./_moderate');

const reviewSchema = mongoose.Schema({
    creator: {
        anonymous: {
            type: Boolean,
            default: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        }
    },
    reviewed: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: String,
    score: {
        type: Number,
        default: 0,
        max: 5
    },
    createdAt: {
        type: Schema.Types.Date,
        default: () => moment().format(),
        required: true,
    },

    ...moderate
});

module.exports = mongoose.model('Review', reviewSchema);
