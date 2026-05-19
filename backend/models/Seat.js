const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({

    movieName: {
        type: String,
        required: true
    },

    seatNumber: {
        type: String,
        required: true
    },

    isBooked: {
        type: Boolean,
        default: false
    },

    bookedBy: {
        type: String,
        default: null
    }
});

module.exports =
    mongoose.model('Seat', seatSchema);