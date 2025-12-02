const express=require('express');
const jwt=require('jsonwebtoken');

const isLoggedIn=function(req,res,next){
    if(req.cookies.token===""){
        console.log("You aren't logged in!");
        return res.redirect('/auth/login');
    }
    const data=jwt.verify(req.cookies.token,process.env.SECRET);
    req.data=data;
    next();
}

module.exports=isLoggedIn;
