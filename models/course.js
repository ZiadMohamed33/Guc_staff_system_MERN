const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    departmentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 3
    },
    instructor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    teachingAssistant : [{
        TA : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        isCoordinator : Boolean
    }]
});



const Course = mongoose.model('Course', coursesSchema);

module.exports = Course;