const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const course = require('../models/course')
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const { findOne } = require('../models/Users');
router.use(express.json());
require('dotenv').config()

    
 //http://localhost:3000/hr_course/add
    router.route('/add').post(async(req, res) => {
        //check if user is hr
        const id = req.body.id
        const user = await userModel.findOne({id:id});
        if(user.role){
            const newcourse = new course({
                departmentId : req.body.departmentId,
                name : req.body.name,
                instructor : req.body.instructor,
                teachingAssistant : req.body.teachingAssistant
            })
            try{
                const savedcourse=await newcourse.save();
                res.json(savedcourse);    
                
                }catch(err){
                 res.json({message:err});
                }
        }
 
   })
   // to test hr_course/update
   router.route('/update').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    console.log(user.role);
    if(user.role){
        // if you want to change name provide old name and new name
     if (req.body.newname){
         await course.findOneAndUpdate({name : req.body.name},{name : req.body.newname});
        }
     if (req.body.departmentId){
            await course.findOneAndUpdate({name : req.body.name},{departmentId : req.body.departmentId});
           }
     if (req.body.instructor){
            await course.findOneAndUpdate({name : req.body.name},{instructor : req.body.instructor});
           }        
     if (req.body.teachingAssistant){
            await course.findOneAndUpdate({name : req.body.name},{name : req.body.teachingAssistant});
           }          
        try{
            
            res.json("updated");    
            
            }catch(err){
             res.json({message:err});
            }
    }

})
   // to test hr_course/delete
router.route('/delete').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role){
        const deletetd = await course.findOneAndDelete({name:req.body.name})
       res.json("deleted")
    }

})
   router.get('/',(req,res)=>{
    res.json("We are online");
    });


module.exports=router;