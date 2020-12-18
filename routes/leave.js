const express = require('express');
const router = express.Router();
const {Leave, validateLeave} = require('../models/leaves');
const Users = require('../models/Users');

router.post('/annual', async (req,res)=>{
    //validating the leave object
    const {error} = validateLeave(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('The given user does not exist');
    
    if(user.annual_leaves < 1) return res.status(400).send('You do not have enough annual days in your annual balance!');
    user.annual_leaves--;
    const leave = new Leave(req.body);
    await leave.save();
    await user.save();
    res.send(leave);
});

module.exports = router;