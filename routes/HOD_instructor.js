const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const faculty = require('../models/faculty')
const course = require('../models/course')
const department = require('../models/department')
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const { find } = require('../models/Users');
router.use(express.json());
require('dotenv').config()

    
 //http://localhost:3000/hr_faculty/add
    router.route('/assign').post(async(req, res) => {
        //check if user is hod
        const id = req.body.id
        const user = await userModel.findOne({id:id});
        console.log(user.role)
        if(!user.role){
            const department = await department.findOne({HODiD : req.body.id})
            const instructorid = await userModel.findOne({id:req.body.instructorid})
            if(department){
            const course = await course.findOneAndUpdate({name:req.body.coursename},{instructor :instructorid._id })
            

            
            try{
                res.json("assigned");    
                
                }catch(err){
                 res.json({message:err});
                }
        }}
 
   })
   // to test hr_faculty/update
   router.route('/update').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    console.log(user.role);
    if(user.role){
        // if you want to change name provide old name and new name
     if (req.body.newname){
        await faculty.findOneAndUpdate({name : req.body.name},{name : req.body.newname});
        }
        if (req.body.deanId){
            await faculty.findOneAndUpdate({name : req.body.name},{deanId : req.body.deanId});
            }
        if (req.body.viceDeanId){
                await faculty.findOneAndUpdate({name : req.body.name},{viceDeanId : req.body.viceDeanId});
                }
        try{
            
            res.json("updated");    
            
            }catch(err){
             res.json({message:err});
            }
    }

})
   // to test hr_faculty/delete
router.route('/delete').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role){
        const deletetd = await faculty.findOneAndDelete({name:req.body.name})
       res.json("deleted")
    }

})
   router.get('/',(req,res)=>{
    res.json("We are online");
    });


module.exports=router;