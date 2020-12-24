const express=require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//jwt
const jwt=require('jsonwebtoken');
const {User} = require('../models/Users');
router.use(express.json());
require('dotenv').config()
//check login page status

router.get('/test',auth_Token,async(req,res)=>{
    const user = await User.findOne({email: req.user.name});
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
    
    
        const user = await User.findOne({email: email});
        if(!user)
        {
            return res.status(400).send("Invalid email or Password");
        }
        // TODO What if user not existing in database
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
        return res.status(400).send('Invalid email or Password');
        }
        else{
            if(req.body.password === "123456"){
                res.redirect('./reset_password.js')
            }
            else{
                const token = user.generateAuthToken();
                res.send(token);
            }
        }
    
    
   // res.header('token', token).send(token);
    //res.json({accessToken:token});
 
//    res.send(token);
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