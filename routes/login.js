const express=require('express');
const router = express.Router();
const userModel=require('../models/Users');
const bcrypt = require('bcrypt');

//check login page status

router.get('/',(req,res)=>{
    res.send("login page");
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
    //const token = jwt.sign({_id: user.id, role: user.role}, process.env.TOKEN_SECRET);
    //res.header('token', token).send(token);
 
    res.send('Logged In!');
   })
 

module.exports=router;