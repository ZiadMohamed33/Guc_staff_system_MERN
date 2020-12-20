const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const leaveSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Annual','Accidental','Sick','Maternity','Compensation'],
        required: true
    },
    startDay:{
        type: Date,
        required: true
    },
    endDay:{
        type: Date,
        default: function (){return this.startDay;}
    },
    accepted:{
        type: Boolean,
        default: false
    }
});

function validateLeave(leave){
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        leaveType: Joi.string().required(),
        startDay: Joi.date().required(),
        endDay: Joi.date()
    });
    return schema.validate(leave);
}

const Leave = mongoose.model('Leave',leaveSchema);

module.exports.Leave = Leave;
module.exports.validateLeave = validateLeave;