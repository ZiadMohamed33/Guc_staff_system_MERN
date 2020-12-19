const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
router.use(express.json());
require('dotenv').config()


router.route('/').put(async(req, res) => {
const id = req.body.id;
const user = await userModel.find({id: id});
if(req.body.password){
return  user.password = req.body.password;
}
   else{res.send('empty field')} 
});

module.exports=router;
