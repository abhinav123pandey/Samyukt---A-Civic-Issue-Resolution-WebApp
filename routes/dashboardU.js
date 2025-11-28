const express=require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/userModel');
const router=express.Router();


router.get('/dashboard',isLoggedIn,async(req,res)=>{
    const email=req.data;
    const user=await userModel.findOne({email});
    res.render('user/dashboard',{user});
}) 

module.exports = router; 