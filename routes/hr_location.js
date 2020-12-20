const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const location = require('../models/location')
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
router.use(express.json());
require('dotenv').config()

    
 
    router.route('/').post(async(req, res) => {
        //check if user is hr
        const id = req.body.id
        const user = await userModel.findOne({id:id});
        console.log(user.role);
        if(user.role){
            const newlocation = new location({
                name : req.body.name,
                capacity : req.body.capacity,
                type : req.body.type
            })
            try{
                const savedlocation=await newlocation.save();
                res.json(newlocation);    
                
                }catch(err){
                 res.json({message:err});
                }
        }
 
   })
   router.get('/',(req,res)=>{
    res.json("We are online");
    });


module.exports=router;