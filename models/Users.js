const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name:   String ,    
    password: String ,

    date:{
        type: Date,
        defult: Date.now
    }
});

module.exports=mongoose.model("Users",UserSchema);