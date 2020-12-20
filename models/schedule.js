const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports.Schedule = Schedule;
module.exports.scheduleSchema = scheduleSchema;