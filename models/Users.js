const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
        name: {
        type: String, minlength: 4, maxlength: 30
        }, password: {
        type: String
        }, email: {
        type: String, required: true, lowercase: true
        }, role: {
        type: Boolean, required: true,
        }, age:  {
        type: Number, min: 18, max: 90 
        }, id:{
        type: String, required: true,
        }, gender:{
        type: String, required: true, enum:['Female','Male']
        }, annual_leaves : {
        type: Number, min: 0, default: 0
        },accidental_leaves : {
        type: Number, min: 0, default: 6, max: 6
        }

       
});


module.exports=mongoose.model("Users",UserSchema);