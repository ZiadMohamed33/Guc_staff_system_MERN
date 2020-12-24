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


 if(latest_att_entry){ //not first attendance entry in db?
    console.log("true1")
    const latest_att_entry_date = await moment(latest_att_entry.Date,"MM/DD/YYYY");
    console.log(latest_att_entry_date.date());
    console.log(moment().date());
    var month = latest_att_entry_date.format('M');

    const today = moment(Date.now());


       if( today.diff(latest_att_entry_date,'months') >= 0 && today.diff(latest_att_entry_date,'days') > 0){// first attendance entry today 
       // console.log("true_month")

        
          console.log("true2")
          const new_att=new attendaceModel({
          id:req.body.id,
          });
          new_att.att_data.push({ signed_In: 'true' });
          new_att.arr_top=new_att.arr_top+1;
          console.log(month)
          new_att.month=month
          const saved_att=await new_att.save();
          return res.json(new_att);
        
          
        }else{//not first entry today
    
           //check if the last signed in check true or false 
           if(latest_att_entry.att_data.pop().signed_In){
            return res.send("two consective signed ins");

            }else{//still to test 
                latest_att_entry.att_data.push({ signed_In: 'true' });
 
               // let doc = await attendaceModel.findOneAndUpdate({id: id}, {arr_top:latest_att_entry.arr_top+1});
                latest_att_entry.arr_top=latest_att_entry.arr_top+1;
                latest_att_entry.month=month

                const saveduser=await latest_att_entry.save();
  
                return res.json(latest_att_entry);
  
}
}
}

 // first attendance entry
 if (!latest_att_entry  ){
    const today = moment(Date.now());
    var month = today.format('M');


    console.log("month")

    const new_att=new attendaceModel({
        id:req.body.id,
    });
    new_att.att_data.push({ signed_In: 'true' });
    new_att.arr_top=new_att.arr_top+1;  
    new_att.month=month;

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
