const mongoose=require('mongoose');
const { scheduleSchema } = require('./schedule');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const jwt = require('jsonwebtoken');
require('dotenv').config()


const UserSchema=mongoose.Schema({
        name: {
        type: String, minlength: 4, maxlength: 30, required: true
        }, password: {
        type: String, required: true, minlength: 8, maxlength: 1024
        }, email: {
        type: String, required: true ,unique : true
        }, role: {
        type: Boolean, required: true,
        }, age:  {
        type: Number, min: 18, max: 90 
        }, id:{
        type: String, unique: true
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

UserSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({id: this.id, email:this.email,role: this.role}, process.env.ACCESS_TOKEN_SECRET);
    return token;
}

function validateUsers(Users){
        const schema = Joi.object({
            id: Joi.string(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            role: Joi.boolean().required(),
            gender: Joi.string().required(),



        });
        return schema.validate(Users);
    }
    
const User = mongoose.model("Users",UserSchema);

module.exports.User = User;
module.exports.validateUsers = validateUsers;
