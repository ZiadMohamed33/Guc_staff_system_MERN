const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const { json } = require('body-parser');
router.use(express.json());

router.get('/',(req,res)=>{
    res.send("view profile page");
    });

router.route('/').post(async(req, res) => {
const id = req.body.id;
const user = await Users.findOne({id: id});
res.json(user);



    
});
module.exports=router;