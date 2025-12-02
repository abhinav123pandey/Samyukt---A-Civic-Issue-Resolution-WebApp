const express=require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const resolverModel = require('../models/resolverModel');
const router=express.Router();


router.get('/dashboard',isLoggedIn,async(req,res)=>{
    const email=req.data;
    const resolver=await resolverModel.findOne({email});
    res.render('resolver/dashboard',{resolver});
}) 
 
module.exports = router; 