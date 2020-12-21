const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel=require('../models/Users');
const attendaceModel=require('../models/attendance');
const { json } = require('body-parser');
router.use(express.json());
const moment = require('moment');


router.get('/',(req,res)=>{
    res.send("sign_in page");
    });
    
router.put('/',async(req,res,next) => {
   // const {error} = validate_attendance(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
   
    const id = req.body.id;
    const user = await userModel.findOne({id: id});
    if(!user){
        return res.status(400).send('user is not in database!');
    }
    
 //bygeeb a5r sign in
 const latest_att_entry = await attendaceModel.findOne({id: id}).sort({ createdAt: -1 }).limit(1);
 if(latest_att_entry){
    console.log("true1")
    const latest_att_entry_date = await moment(latest_att_entry.Date,"MM/DD/YYYY");
    console.log(latest_att_entry_date.date());
    console.log(moment().date());
   

 if( latest_att_entry_date.isAfter(moment()) ){
    console.log("true2")

    const new_att=new attendaceModel({
        id:req.body.id,
    });
    new_att.att_data.push({ signed_In: 'true' });

    new_att.arr_top=new_att.arr_top+1;
    const saved_att=await new_att.save();

    return res.json(new_att);
}else{
 
    return res.send("on the same day");
         }
}

 // first attendance entry
 if (!latest_att_entry  ){
    console.log("true3")

    const new_att=new attendaceModel({
        id:req.body.id,
    });
    new_att.att_data.push({ signed_In: 'true' });
    new_att.arr_top=new_att.arr_top+1;
    const saved_att=await new_att.save();

   return res.json(new_att);
    //att entry exists
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
