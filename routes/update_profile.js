const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
router.use(express.json());
require('dotenv').config()


router.route('/').put(async(req, res) => {
const id = req.body.id;
const user = await userModel.findOne({id: id});
if(req.body.password){
return  user.password = req.body.password;}
if(req.body.gender){
 return  user.gender = req.body.gender;}
 if(req.body.email){
    return  user.email = req.body.email;}
 if(req.body.role){
   return  user.role = req.body.role;}
   if(req.body.age){
    return  user.age = req.body.age;}
//law role b true yb2a hr
if(user.role){
    if(req.body.salary){
        return  user.salary = req.body.salary;}
}



    
});
module.exports=router;
