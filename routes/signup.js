const express=require('express');
const router = express.Router();
const Users=require('../models/Users');



//check signup page status
router.get('/',(req,res)=>{
    res.send("signup page");
    });


//signup
router.post('/',async (req,res)=>{

 //   const {email, password} = req.body
   // TODO Validate the inputs required exist
  
 //  const user = await userModel.findOne({email: email});
   // TODO What if user not existing in database


    //authentication to be made
    const username=req.body.name;
       const new_user=new Users({
          name:req.body.name,
          password:req.body.password,
          email:req.body.email,
          role:req.body.role
    });
    try{
       const saveduser=await new_user.save();
       res.json(saveduser);    
       
       }catch(err){
        res.json({message:err});
       }
   
       //console.log(req.body);
   
 // jwt.sign(user,process.env.ACCESS_TOCKEN_SECRET)
  
 });
 

module.exports=router;