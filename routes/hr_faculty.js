const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const faculty = require('../models/faculty')
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const { findOne } = require('../models/Users');
router.use(express.json());
require('dotenv').config()

    
 //http://localhost:3000/hr_faculty/add
    router.route('/add').post(async(req, res) => {
        //check if user is hr
        const id = req.body.id
        const user = await userModel.findOne({id:id});
        if(user.role){
            const newfaculty = new faculty({
                name : req.body.name,
                deanId : req.body.deanId,
                viceDeanId : req.body.viceDeanId
            })
            try{
                const savedfaculty=await newfaculty.save();
                res.json(savedfaculty);    
                
                }catch(err){
                 res.json({message:err});
                }
        }
 
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