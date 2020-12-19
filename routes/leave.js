const express = require('express');
const router = express.Router();
const {Leave, validateLeave} = require('../models/leaves');
const Users = require('../models/Users');
const moment = require('moment');

router.post('/annual', async (req,res)=>{
    //validating the leave object
    const {error} = validateLeave(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    if(req.body.leaveType !== 'Annual') return res.status(400).send('FATAL ERROR! Wrong leave type submitted!')
    let user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('The given user does not exist');
    if(user.startDay < Date.now()) return res.status(400).send('Annual leave requests should be submitted before the targted day!'); 
    if(user.annual_leaves < 1) return res.status(400).send('You do not have enough annual days in your annual balance!');
    if(req.body.startDay !== req.body.endDay) return res.status(400).send('Annual leaves are submitted for a single day!');
    user.annual_leaves--;
    const leave = new Leave(req.body);
    await leave.save();
    await user.save();
    res.send(leave);
});

router.post('/accidental', async (req,res)=>{
    //validating the leave object
    const {error} = validateLeave(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('The given user does not exist');
    
    if(user.annual_leaves < 1) return res.status(400).send('You do not have enough annual days in your annual balance!');
    if(user.accidental_leaves < 1) return res.status(400).send('You do not have enough accidental leaves allowance!');
    user.annual_leaves--;
    user.accidental_leaves--;
    const leave = new Leave(req.body);
    await leave.save();
    await user.save();
    res.send(leave);
});

router.post('/sick', async (req,res)=>{
    //validating the leave object
    const {error} = validateLeave(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const today = moment(Date.now());
    const leaveStartDay = moment(req.body.startDay,"MM/DD/YYYY");
    const leaveEndDay = moment(req.body.endDay,"MM/DD/YYYY");
    if(leaveStartDay.diff(leaveEndDay,'days') > 0)
        return res.status(400).send('Leave end date can not be earlier than the start end date');
    if(today.diff(leaveStartDay,'days') > 3) 
        return res.status(400).send('A sick leave can not be submitted after 3 days of the sick day!');

    let user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('The given user does not exist');
    
    req.body.startDay = leaveStartDay.add(1,'days');
    req.body.endDay = leaveEndDay.add(1,'days');
    const leave = new Leave(req.body);
    await leave.save();
    res.send(leave);
});

router.post('/maternity', async (req,res)=>{
    //validating the leave object
    const {error} = validateLeave(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('The given user does not exist');
    
    if(user.gender === 'Female') return res.status(400).send('Males can not submit a maternity leave request!');
    const leave = new Leave(req.body);
    await leave.save();
    res.send(leave);
});

router.post('/compensation', async (req,res)=>{
    //validating the leave object
    const {error} = validateLeave(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findById(req.body.userId);
    if(!user) return res.status(400).send('The given user does not exist');
    
    const leave = new Leave(req.body);
    await leave.save();
    res.send(leave);
});

module.exports = router;