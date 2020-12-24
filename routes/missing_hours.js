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
    res.json("We are online");
    });
