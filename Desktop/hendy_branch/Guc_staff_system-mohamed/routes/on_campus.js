const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const attendaceModel=require('../models/attendance');
const bcrypt = require('bcrypt');



//check signup page status
router.get('/signin',(req,res)=>{
    res.send("on campus page page");
    });


    router.post('/',async(req,res)=>{
        //const user = await userModel.findOne({email: req.user.name});
        
        const new_att=new attendaceModel({
            id:req.body.id,
          

        });
        new_att.att_data.push({ signed_In: 'true' });
        const saved_att=await new_att.save();

        res.json(new_att)
        

        
    
    });
    




    module.exports=router;