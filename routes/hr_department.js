const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const department = require('../models/department')
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const { findOne } = require('../models/Users');
router.use(express.json());
require('dotenv').config()

    
 //http://localhost:3000/hr_department/add
    router.route('/add').post(async(req, res) => {
        //check if user is hr
        const id = req.body.id
        const user = await userModel.findOne({id:id});
        if(user.role){
            const newdepartment = new department({
                name : req.body.name,
                facultyId : req.body.facultyId,
                HODiD : req.body.HODiD
            })
            try{
                const saveddepartment=await newdepartment.save();
                res.json(saveddepartment);    
                
                }catch(err){
                 res.json({message:err});
                }
        }
 
   })
   // to test hr_department/update
   router.route('/update').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    console.log(user.role);
    if(user.role){
        // if you want to change name provide old name and new name
     if (req.body.newname){
        await department.findOneAndUpdate({name : req.body.name},{name : req.body.newname});
        }
        if (req.body.facultyId){
             await department.findOneAndUpdate({name : req.body.name},{facultyId : req.body.facultyId});
            }
            if (req.body.HODiD){
             await department.findOneAndUpdate({name : req.body.name},{HODiD : req.body.HODiD});
                }
        try{
            
            res.json("updated");    
            
            }catch(err){
             res.json({message:err});
            }
    }

})
   // to test hr_department/delete
router.route('/delete').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role){
        const deletetd = await department.findOneAndDelete({name:req.body.name})
       res.json("deleted")
    }

})
   router.get('/',(req,res)=>{
    res.json("We are online");
    });


module.exports=router;