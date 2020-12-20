const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    facultyId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    HODiD: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports.Department = Department;