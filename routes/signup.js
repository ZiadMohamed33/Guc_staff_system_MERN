const express=require('express');
const router = express.Router();
const {User,validateUsers}=require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function getNextId(role){
    if(role){
        const lastUser = await User.findOne({role:true}).sort({id:-1});
        if(!lastUser){
            return 'hr-1';
        }
        else{
            const lastUserId = lastUser.id.toString();
            const oldId = lastUserId.split('-')[1];
            const newId = 'hr-'+(parseInt(oldId)+1);
            return newId;
        }
    }
    else{
        const lastUser = await User.findOne({role:false}).sort({id:-1});
        if(!lastUser){
            return 'ac-1';
        }
        else{
            const lastUserId = lastUser.id.toString();
            const oldId = lastUserId.split('-')[1];
            const newId = 'ac-'+(parseInt(oldId)+1);
            return newId;
        }
    }
}

//check signup page status
router.get('/',(req,res)=>{
    res.send("signup page");
    });


//signup
router.post('/',async (req,res)=>{

    const {email, password} = req.body
//    TODO Validate the inputs required exist
  
    const user = await User.findOne({email: email});
//    TODO What if user not existing in database
    // const {error} = validateUsers(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    if(user){
        return res.status(400).send('Email address already exist!');
    }
    else{
        //authentication to be made
        const salt = await bcrypt.genSalt(10);
        // req.body.password="123456";
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let autoid = '';
        await getNextId(req.body.role).then(newid => autoid=newid);
        //REPLACED WITH THE getNextId FUNCTION
        //check lw hr by7ot hr- we ygeb count el hrs we yzwd wa7d lsa7bna elgded
        // if (req.body.role ){const title = "hr-"
        // let dbcount =await User.count({role:true},)
        // dbcount+=1
        // autoid = title + dbcount
        // }else{const title = "ac-"
        // let dbcount =await User.countDocuments({role:false})
        // dbcount+=1
        // autoid = title + dbcount
        // }
        
        const new_user=new User({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            role:req.body.role,
            gender:req.body.gender,
            id: autoid
        });
        const token = new_user.generateAuthToken();
        try{
        const saveduser=await new_user.save();
        res.header('x-auth-token',token).send(saveduser);    
        
        }catch(err){
            console.log(err);
            res.json({message:err});
        }

    }

    
   
       //console.log(req.body);
   
 // jwt.sign(user,process.env.ACCESS_TOCKEN_SECRET)
  
 });
 

module.exports=router;