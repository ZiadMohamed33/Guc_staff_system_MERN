const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
router.use(express.json());
require('dotenv').config()
const moment = require('moment');


router.route('/').put(async(req, res) => {
const id = req.body.id;
let user = await userModel.find({id: id});

if(req.body.password){
   const salt = await bcrypt.genSalt(10);
   req.body.password = await bcrypt.hash(req.body.password, salt);
   let update=req.body.password;
   console.log(req.body.password)
   try{
   let doc = await userModel.findOneAndUpdate({id: id}, {password:update});
}catch(err){
   res.json({message:err});
}
   res.send("password changed");
}
   else{res.send('empty field')} 
});

module.exports=router;
