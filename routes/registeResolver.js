const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resolverModel = require('../models/resolverModel');

router.get('/register-resolver', (req, res) => {
    res.render("auth/register-resolver",{error:null,success:null});
})

router.post('/registerResolver', async (req, res) => {
    try {
        const { departmentName,departmentType,contactPerson,designation,email,password,city,area,address,confirmPassword,phone} = req.body;
        const resolver=await resolverModel.findOne({email,phone,city,departmentName});
        console.log(resolver);
        if(!resolver){ 
            if (password != confirmPassword) {
                return res.render("auth/register-resolver", { error: "Passwords do not match", success: null });
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async(err, hash) => {
                    const createdResolver = await resolverModel.create({
                        departmentName,
                        departmentType,
                        contactPerson,
                        designation,
                        email,
                        password:hash,
                        phone, 
                        city,
                        area,
                        address,

                    })
                    console.log({ createdResolver });
                    const token = jwt.sign(email, process.env.SECRET);
                    res.cookie("token", token);
                    res.cookie("msg", "Registered Successfully!", { maxAge: 3000 });
                    return res.redirect("/resolver/dashboard");
                })
            })
        }
        else{
            return res.render("auth/register-resolver", {
            error: "This Account already exists.Register with another email!",
            success: null
        });
        }
    }catch(err){
        console.log(err);
        return res.render("auth/register-reolver", {
            error: "Something went wrong. Try again.",
            success: null
        });
    }
})
module.exports = router;