const express=require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const complaintModel = require('../models/complaint');
const userModel=require('../models/userModel');
const resolverModel=require('../models/resolverModel');
const router=express.Router();


router.get('/createComplaint',isLoggedIn,async(req,res)=>{
    const email=req.data;
    const user=await userModel.findOne({email});
    res.render('user/createComplaint',{user});
}) 

router.post('/createComplaint',isLoggedIn,async(req,res)=>{
    const {title,description,category,city,area,location,priority,userId}=req.body;
    const user=await userModel.findOne({email:req.data});
    const resolver=await userModel.findOne({city,area,category,location});
    const createdComplaint=await complaintModel.create({
        title,
        description,
        category,
        city,
        area,
        location,
        stauts:"pending",
        priority,
        userId:user._id
    })
    user.complaints.push(createdComplaint._id);
    // resolver.complaints.push(createdComplaint._id);
    // createdComplaint.resolver.push(resolver._id);
    await user.save();
    // await resolver.save();
    // await createdComplaint.save();
    console.log({user});
    console.log({resolver});
    console.log({createdComplaint});
    return res.redirect('/user/dashboard');
})
module.exports = router; 