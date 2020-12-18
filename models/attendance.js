const mongoose=require('mongoose');


const att_data = mongoose.Schema( {
    Date: { type: Date, default: Date.now },
    signed_In: {type:Boolean} },
   {timestamps: true });

const attendance = mongoose.Schema({
    id:{type: String, required: true},
    day_off : {type: String},
    Date: { type: Date, default: Date.now },
    att_data:[att_data],
    minutes_spent: {type:Number , default: "0"},
    monthly_minutes_spent : {type:Number , default: "0"}
});


    
    

    module.exports=mongoose.model("attendance",attendance);