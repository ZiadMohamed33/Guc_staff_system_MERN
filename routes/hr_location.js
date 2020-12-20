const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const location = require('../models/location')
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
router.use(express.json());
require('dotenv').config()

    
 //http://localhost:3000/hr_location/add
    router.route('/add').post(async(req, res) => {
        //check if user is hr
        const id = req.body.id
        const user = await userModel.findOne({id:id});
        if(user.role){
            const newlocation = new location({
                name : req.body.name,
                capacity : req.body.capacity,
                type : req.body.type
            })
            try{
                const savedlocation=await newlocation.save();
                res.json(newlocation);    
                
                }catch(err){
                 res.json({message:err});
                }
        }
 
   })
   // to test hr_location/update
   router.route('/update').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    console.log(user.role);
    if(user.role){
        // if you want to change name provide old name and new name
     if (req.body.newname){
        let newlocation = await location.findOneAndUpdate({name : req.body.name},{name : req.body.newname});
        }
     if (req.body.capacity){
        let newlocation = await location.findOneAndUpdate({name : req.body.name},{capacity : req.body.capacity})
        }
     if (req.body.type){
        let newlocation = await location.findOneAndUpdate({name : req.body.name},{type : req.body.type})   
            }
        try{
            const savedlocation=await newlocation.save();
            res.json(newlocation);    
            
            }catch(err){
             res.json({message:err});
            }
    }

})
   // to test hr_location/delete
router.route('/delete').post(async(req, res) => {
    //check if user is hr
    const id = req.body.id
    const user = await userModel.findOne({id:id});
    if(user.role){
        const deletetd = await location.findOneAndDelete({name:req.body.name})
       res.json("deleted")
    }

})
   router.get('/',(req,res)=>{
    res.json("We are online");
    });


module.exports=router;