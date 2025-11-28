const express=require('express');
const userModel = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resolverModel = require('../models/resolverModel');

router.get('/login-resolver',(req,res)=>{
    res.render("auth/login-resolver"); 
})

router.post('/loginResolver',async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await resolverModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign(email, process.env.SECRET);
                    res.cookie("token", token);
                    res.cookie("msg", "Registered Successfully!", { maxAge: 3000 });
                    console.log("Resolver added successfully");
                    return res.redirect("/resolver/dashboard");
                }
                else{
                    console.log("password mismatched");
                    return res.render("auth/login-resolver", { error: "Passwords do not match", success: null });
                }
            })
        }
        else{
            console.log("User Not Found!");
            return res.render("auth/login-resolver", { error: "Wrong Email or Password!", success: null });
        }
    }catch(err){ 
        return res.render("auth/login-resolver");
    }
})
module.exports=router;    