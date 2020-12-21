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
if(id){
    if (req.body.gender || req.body.email || req.body.age ) {
        try{
if(req.body.gender){
    let doc = await userModel.findOneAndUpdate({id: id}, {gender:req.body.gender});
}
 if(req.body.email){
    let doc = await userModel.findOneAndUpdate({id: id}, {email:req.body.email});
 } 
   if(req.body.age){
    let doc = await userModel.findOneAndUpdate({id: id}, {age:req.body.age});
 } 
}catch (err){
    res.json({message:err});
 }
    res.send("profile was updated");
 }else{
    res.send('empty field');

 }
}else{
    res.send('ID is not present');

}
    
});
module.exports=router;
