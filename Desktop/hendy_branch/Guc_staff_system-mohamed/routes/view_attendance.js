const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const attendance = require('../models/attendance');
router.use(express.json());


router.route('/').get(async(req, res) => {
 const id = req.body.id;
 if (req.body.month){
     month = req.body.month;
     month =-1
    const attended = attendance.filter(function(elem){
     return elem.id == id && elem.att_data.Date.getMonth()==month


    })


 }
 else{
 const attended = attendance.find({id: id})
 res.json(attended)
 }

    
});
module.exports=router;