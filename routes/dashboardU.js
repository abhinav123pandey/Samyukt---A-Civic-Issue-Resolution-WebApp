const express=require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/userModel');
const complaintModel=require('../models/complaint');
const router=express.Router();


router.get('/dashboard',isLoggedIn,async(req,res)=>{
    const email=req.data;
    const user=await userModel.findOne({email});
    let pending=0;
    let inProgress=0;
    let resolved=0;
    let allComplaints=[];
    for (const complaintId of user.complaints) {
        try {
            const compl = await complaintModel.findById(complaintId);
            if(compl.statusOC=="pending"){
                pending++;
            }
            else if(compl.statusOC=="resolved"){
                resolved++;
            }
            else{
                inProgress++;
            }
            allComplaints.push(compl);
        } catch (err) {
            console.error('err fetching complaint', complaintId, err);
        }
    }
    res.render('user/dashboard',{user,pending,inProgress,resolved,allComplaints});
}) 

module.exports = router; 