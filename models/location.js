const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum : ['Lab','Lecture hall','Tutorial room','Office'],
        required: true
    }
});

const Location = mongoose.model('Location',locationSchema);

module.exports = Location;