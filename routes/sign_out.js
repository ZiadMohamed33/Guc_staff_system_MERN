const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const userModel=require('../models/Users');
const attendaceModel=require('../models/attendance');
const att_data=require('../models/attendance');

const { json } = require('body-parser');
router.use(express.json());
const moment = require('moment');


router.get('/',(req,res)=>{
    res.send("sign_in page");
    });
    
router.put('/',async(req,res,next) => {
   
    const id = req.body.id;
    const user = await userModel.findOne({id: id});
    if(!user){
        return res.status(400).send('user is not in database!');
    }
    
 const latest_att_entry = await attendaceModel.findOne({id: id}).sort({ createdAt: -1 }).limit(1); //bygeeb a5r sign in


 if(latest_att_entry){ // first attendance entry in db?
    console.log("true1")
    const latest_att_entry_date = await moment(latest_att_entry.Date,"MM/DD/YYYY");
    console.log(latest_att_entry_date.date());
    console.log(moment().date());
   
    const today = moment(Date.now());
        

       if( today.diff(latest_att_entry_date,'months') >= 0 && today.diff(latest_att_entry_date,'days') > 0){// first attendance entry today 
       // console.log("true_month")
       console.log("true2")

       return res.send("push sign in first")

        
          
        }else{//not first entry today
    
           //check if the last signed in check true or false 
           if(latest_att_entry.att_data.pop().signed_In){
            const latest_att_entry_time = await moment(latest_att_entry.Date,"hh:mm:ss a");
            console.log(latest_att_entry_time);
            console.log(moment());

           let hours = await today.diff(latest_att_entry_time, 'hours');
           console.log(hours);

           let mins = await today.diff(latest_att_entry_time, 'minutes');
           console.log(mins);

           let seconds = await today.diff(latest_att_entry_time, 'seconds');
           console.log(seconds);
           let mins_spent=(hours*60)+(seconds/60);
           console.log(mins_spent);


             await latest_att_entry.att_data.push({ signed_In: 'false' });
 
              latest_att_entry.arr_top=latest_att_entry.arr_top+1;
              latest_att_entry.minutes_spent=mins_spent;
              latest_att_entry.daily_minutes_spent=latest_att_entry.daily_minutes_spent+latest_att_entry.minutes_spent

              const saveduser=await latest_att_entry.save();

              return await res.json(saveduser);
 

            }else{//still to test 
             

             return res.json("two consecutive signouts");

}
}
}

 // first attendance entry
 if (!latest_att_entry  ){
   return res.send("push sign in first")
  
 }
 next();
    
});
module.exports=router;