const mongoose=require('mongoose');
const { scheduleSchema } = require('./schedule');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);



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
        type: String, required: true, unique: true
        }, gender:{
        type: String, required: true, enum:['Female','Male']
        },day_off : {
        type: String
        }, annual_leaves : {
        type: Number, min: 0, default: 0
        },accidental_leaves : {
        type: Number, min: 0, default: 6, max: 6
        }
        ,salary :{
        type: Number 
        }, schedule : scheduleSchema

       
});


function validateUsers(Users){
        const schema = Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            role: Joi.boolean().required(),
            gender: Joi.string().required(),



        });
        return schema.validate(Users);
    }
    
    
module.exports=mongoose.model("Users",UserSchema);
module.exports.validateUsers = validateUsers;
