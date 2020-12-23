const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel=require('../models/Users');
const attendaceModel=require('../models/attendance');
const att_data=require('../models/attendance');

const { json } = require('body-parser');
router.use(express.json());
const moment = require('moment');

router.get('/',(req,res)=>{
    res.json("We are online");
    });

router.route('/').post(async(req, res) => {
 const id = req.body.id;
 const user = await userModel.findOne({id: id});
 if(!user){
     return res.status(400).send('user is not in database!');
 }

 
 const attended = await attendance.find({id: id})
 res.json(attended)

    
});

router.route('/by_month').post(async(req, res) => {
    const id = req.body.id;
    const month=req.body.month;
    const user = await userModel.findOne({id: id});
    if(!user){
        return res.status(400).send('user is not in database!');
    }

  if(month>12 || month<1){
    return res.status(400).send("months are from 1-12")
  }

  
    //console.log(months)

    const attended = await attendaceModel.find({id:id ,month: month})
    if(!attended){
        return res.send("no attendance entries found")

    }

    res.json(attended)

        
});
module.exports=router;
