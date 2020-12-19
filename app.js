
//expresss
const express=require('express');
const app =express();
//3ashan n2ra elposts
const bodyParser=require("body-parser");
app.use(bodyParser.json());
//jwt
const jwt=require('jsonwebtoken');
app.use(express.json());  
 


//middlewares


const router=require('./routes/Users');
app.use('/Users',router);


const login_route=require('./routes/login');
app.use('/login',login_route);


const signup_route=require('./routes/signup');
app.use('/signup',signup_route);


const leave_route=require('./routes/leave');
app.use('/leave',leave_route);


const sign_in = require('./routes/sign_in');
app.use('/sign_in',sign_in);


const view_profile = require('./routes/view_profile');
app.use('/view_profile',view_profile);

const view_attendance = require('./routes/view_attendance');
app.use('/view_attendance',view_attendance);

const reset_password = require('./routes/reset_password');
app.use('/reset_password',reset_password);

const update_profile = require('./routes/update_profile');
app.use('/update_profile',update_profile);

//check server status
app.get('/',(req,res)=>{
   res.json("We are online");
   });

      module.exports=app;
