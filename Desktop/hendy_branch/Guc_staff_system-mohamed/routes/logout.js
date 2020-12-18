const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
router.use(express.json());
require('dotenv').config()




    
 
    router.route('/').post(async(req, res) => {
        const {email, password} = req.body
        // TODO Validate the inputs required exist
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.sendStatus(403)
            req.user=user
     });
       
    const token = jwt.sign({}, "");
    res.header('token', token).send(token);
    //res.json({accessToken:token});
 
   res.send('Logged out!');
   })
 

   
   
//authinticate

    // TODO deny access if token does not exist

       
    next();
   

module.exports=router;