const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const attendance = require('../models/attendance');
router.use(express.json());


router.route('/').post(async(req, res) => {
 const id = req.body.id;
 
 const attended = await attendance.find({id: id})
 res.json(attended)
 

    
});
module.exports=router;