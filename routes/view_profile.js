const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
router.use(express.json());
require('dotenv').config()


router.route('/').post(async(req, res) => {
const id = req.body.id;
const user = await userModel.findOne({id: id});
res.json(user);



    
});