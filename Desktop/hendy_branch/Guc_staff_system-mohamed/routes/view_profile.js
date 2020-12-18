const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
router.use(express.json());


router.route('/').post(async(req, res) => {
const id = req.body.id;
const user = await userModel.findOne({id: id});
res.json(user);



    
});
module.exports=router;