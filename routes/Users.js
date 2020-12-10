const express=require('express');
const router = express.Router();
const Users=require('../models/Users');


router.post('/',async (req,res)=>{
    const user=new Users({
        name:req.body.name,
        password:req.body.password
    });

    try{
    const saveduser=await user.save();
    res.json(saveduser);    
    
    }catch(err){
     res.json({message:err});
    }

    //console.log(req.body);
});


router.get('/',async (req,res)=>{
try{
const users=await Users.find();
res.json(users);
} catch(err){
    res.json({message:err});
   }
});

module.exports=router;