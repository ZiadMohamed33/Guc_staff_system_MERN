const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
const attendaceModel=require('../models/attendance');
const { json } = require('body-parser');
router.use(express.json());

router.get('/',(req,res)=>{
    res.send("sign_in page");
    });
    
router.put('/addatt',async(req,res,next) => {
 const id = req.body.id;
 //bygeeb a5r sign in
 const latest_att_entry = await attendaceModel.findOne({id: id}).sort({ createdAt: -1 }).limit(1);
 
 // first attendance entry
 if (!latest_att_entry){
    const new_att=new attendaceModel({
        id:req.body.id,
    });
    new_att.att_data.push({ signed_In: 'true' });
    const saved_att=await new_att.save();

    res.json(new_att.Date)
    //att entry exists
 }else{
  //if on the same day add the array if latest signed in = false
const date=await latest_att_entry.Date;
res.json(date)
  //if no att on this date make a new entry 
 

 }
 next();
    
});


module.exports=router;

/*   
 const flag=await last_attend.att_data.signed_In
 if (!flag){
const attended = new attendance({
    id : req.body.id,
    att_data : [ signed_In=true],
})

}*/
