const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


router.get('/register', (req, res) => {  
    res.render("auth/register",{error:null,success:null});
})
 
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, city, address, area, password, confirmPassword } = req.body;
        const user=await userModel.findOne({email,phone});
        console.log(user);
        if(!user){ 
            if (password != confirmPassword) {
                return res.render("auth/register", { error: "Passwords do not match", success: null });
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async(err, hash) => {
                    const createdUser = await userModel.create({
                        name,
                        password: hash,
                        phone,
                        email,
                        city,
                        address,
                        area,

                    })
                    console.log({ createdUser });
                    const token = jwt.sign(email, process.env.SECRET);
                    res.cookie("token", token);
                    res.cookie("msg", "Registered Successfully!", { maxAge: 3000 });
                    return res.redirect("/user/dashboard");
                })
            })
        }
        else{
            return res.render("auth/register", {
            error: "This Account already exists.Register with another email!",
            success: null
        });
        }
    }catch(err){
        // console.log(err);
        // return;
        return res.render("auth/register", {
            error: "Something went wrong. Try again.",
            success: null
        });
    }
})
module.exports = router;