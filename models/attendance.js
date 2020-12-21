const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);



const att_data = mongoose.Schema( {
    Date: { type: Date, default: Date.now },
    signed_In: {type:Boolean} },
   {timestamps: true });

const attendance = mongoose.Schema({
    id:{type: String, required: true,ref: 'Users'},
    Date: { type: Date, default: Date.now },
    arr_top:{type:Number , default: "0"},
    att_data:[att_data],
    minutes_spent: {type:Number , default: "0"},
    monthly_minutes_spent : {type:Number , default: "0"}
});


    

function validate_attendance(attendance){
    const schema = Joi.object({
        id: Joi.string().required()



    });
    return schema.validate(attendance);
}

module.exports=mongoose.model("attendance",attendance);
module.exports.validate_attendance = validate_attendance;
