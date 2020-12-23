const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');



//check signup page status
router.get('/',(req,res)=>{
    res.send("signup page");
    });


//signup
router.post('/',async (req,res)=>{

    const {email, password} = req.body
//    TODO Validate the inputs required exist
  
    const user = await userModel.findOne({email: email});
//    TODO What if user not existing in database

    if(user){
        return res.status(400).send('Email address already exist!');
    }
    else{
        //authentication to be made
        const salt = await bcrypt.genSalt(10);
        req.body.password="123456";
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let autoid = "";
        //check lw hr by7ot hr- we ygeb count el hrs we yzwd wa7d lsa7bna elgded
        if (req.body.role ){const title = "hr-"
        let dbcount =await userModel.count({role:true},)
        dbcount+=1
        autoid = title + dbcount
        }else{const title = "ac-"
        let dbcount =await userModel.countDocuments({role:false})
        dbcount+=1
        autoid = title + dbcount
        }

        const new_user=new userModel({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            role:req.body.role,
            gender:req.body.gender,
            id: autoid
        });
        try{
        const saveduser=await new_user.save();
        res.json(saveduser);    
        
        }catch(err){
            res.json({message:err});
        }

    }

    
   
       //console.log(req.body);
   
 // jwt.sign(user,process.env.ACCESS_TOCKEN_SECRET)
  
 });
 

module.exports=router;