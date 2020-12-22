
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

const sign_out = require('./routes/sign_out');
app.use('/sign_out',sign_out);



const view_profile = require('./routes/view_profile');
app.use('/view_profile',view_profile);

const view_attendance = require('./routes/view_attendance');
app.use('/view_attendance',view_attendance);

const reset_password = require('./routes/reset_password');
app.use('/reset_password',reset_password);

const update_profile = require('./routes/update_profile');
app.use('/update_profile',update_profile);

const hr_location = require('./routes/hr_location');
app.use('/hr_location',hr_location);

const hr_faculty = require('./routes/hr_faculty');
app.use('/hr_faculty',hr_faculty);

const hr_department = require('./routes/hr_department');
app.use('/hr_department',hr_department);

const hr_course = require('./routes/hr_course');
app.use('/hr_course',hr_course);

const hr_rest = require('./routes/hr_rest');
app.use('/hr_rest',hr_rest);

//check server status
app.get('/',(req,res)=>{
   res.json("We are online");
   });

      module.exports=app;
