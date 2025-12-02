const express=require('express');
const userModel = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/login',(req,res)=>{
    res.render("auth/login"); 
})

router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await userModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign(email, process.env.SECRET);
                    res.cookie("token", token);
                    res.cookie("msg", "Registered Successfully!", { maxAge: 3000 });
                    console.log("User logged in");
                    return res.redirect("/user/dashboard");
                }
                else{
                    console.log("password mismatched");
                    return res.render("auth/login", { error: "Passwords do not match", success: null });
                }
            })
        }
        else{
            console.log("User Not Found!");
            return res.render("auth/login", { error: "Wrong Email or Password!", success: null });
        }
    }catch(err){
        return res.render("auth/login");
    }
})
module.exports=router;    