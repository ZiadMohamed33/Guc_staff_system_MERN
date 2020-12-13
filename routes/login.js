const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const Users = require('../models/Users');
router.use(express.json());
require('dotenv').config()
//check login page status

router.get('/test',auth_Token,async(req,res)=>{
    const user = await userModel.findOne({email: req.user.name});
res.json(user)
    
    //res.send("login page");
    });

    
 
    router.route('/').post(async(req, res) => {
        const {email, password} = req.body
        // TODO Validate the inputs required exist
    
    //  Validate the inputs required exist
        if(!email & !password )
        {
        return res.status(400).send("Email address field and password field are empty");
        }
        else if(!email)
        {
            return res.status(400).send("Email address field is empty");
        }
        else if(!password)
        {
            return res.status(400).send("password field is empty");
        }
    
    
        const user = await userModel.findOne({email: email});
        if(!user)
        {
            return res.status(400).send("Invalid email or Password");
        }
        // TODO What if user not existing in database
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
        return res.status(400).send('Invalid email or Password');
        }
    
    const token = jwt.sign({_id: user.id, role: user.role}, process.env.ACCESS_TOKEN_SECRET);
    res.header('token', token).send(token);
    //res.json({accessToken:token});
 
   // res.send('Logged In!');
   })
 

   
   
//authinticate

function auth_Token(req, res, next) {
    const token = req.headers.token;
    if (token==null){
           return res.sendStatus(401)
       }
    // TODO deny access if token does not exist
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
           if(err) return res.sendStatus(403)
           req.user=user
    });
       
    next();
   }
   

module.exports=router;