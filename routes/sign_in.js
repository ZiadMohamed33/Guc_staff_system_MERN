const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const attendance = require('../models/attendance');
router.use(express.json());
require('dotenv').config()


router.route('/').get(async(req, res) => {
 const id = req.body.id;
 //bygeeb a5r sign in
 const last_attend = attendance.find({id: id}).sort({ createdAt: -1 }).limit(1);
 if (!last_attend.att_data.signed_In){
     if(express=express){
const attended = new attendance({
    id : req.body.id,
    att_data : [ signed_In=true]
    
   
})
       await attended.save()
}
 }


    
});