const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name: {
        type: String, minlength: 4, maxlength: 30
        }, password: {
        type: String,required: true,
        }, email: {
        type: String, required: true,
        }, role: {
        type: String, required: true,
        }
       
});

module.exports=mongoose.model("Users",UserSchema);