const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const course = require('../models/course')
const attendanceModel = require('../models/attendance')
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const { findOne } = require('../models/Users');
router.use(express.json());
require('dotenv').config()

    
 //http://localhost:3000/hr_rest/
    router.route('/update_staff').post(async(req, res) => {
        //check if user is hr
        const hr_id = req.body.id
        const id = req.body.memberid
        const user = await userModel.findOne({id:hr_id});
        if(user.role){
            if(req.body.gender){
                let doc = await userModel.findOneAndUpdate({id: id}, {gender:req.body.gender});
            }
            if(req.body.email){
                let doc = await userModel.findOneAndUpdate({id: id}, {email:req.body.email});
             } 
            if(req.body.age){
                let doc = await userModel.findOneAndUpdate({id: id}, {age:req.body.age});
             } 
             if(req.body.role){
                let doc = await userModel.findOneAndUpdate({id: id}, {role:req.body.role});
             } 

        }
        try{
            
            res.json("updated");    
            
            }catch(err){
             res.json({message:err});
            }
           })
   // to test hr_rest/delete_staff
   router.route('/delete_staff').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role){
     if (req.body.memberid){
         await userModel.findOneAndDelete({id : req.body.memberid});
        }         
        try{
            
            res.json("deleted");    
            
            }catch(err){
             res.json({message:err});
            }
    }

})
   // to test hr_course/add_signin
router.route('/add_signin').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role && id!=req.body.memberid){
        const new_att=new attendaceModel({
            id:req.body.memberid,
        });
        new_att.att_data.push({ signed_In: 'true' });
        new_att.arr_top=new_att.arr_top+1;
        const saved_att=await new_att.save();
    
       return res.json(new_att);
    }

})
router.route('/add_signout').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role && id!=req.body.memberid){
        const new_att=new attendaceModel({
            id:req.body.memberid,
        });
        new_att.att_data.push({ signed_In: 'false' });
        new_att.arr_top=new_att.arr_top+1;
        const saved_att=await new_att.save();
    
       return res.json(new_att);
    }
    

})
router.route('/view_attendance').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role){
    const attendance = await attendanceModel.find({id:req.body.memberid})
    res.json(attendance)
    }
})  
router.route('/update_salary').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role){
     await userModel.findOneAndUpdate({id:req.body.memberid},{salary : req.body.salary})
    }
    try{
            
        res.json("updated");    
        
        }catch(err){
         res.json({message:err});
        }
})  

router.get('/',(req,res)=>{
    res.json("We are online");
    });


module.exports=router;