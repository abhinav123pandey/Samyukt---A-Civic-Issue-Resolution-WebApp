const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const complaintModel = require('../models/complaint');
const userModel = require('../models/userModel');
const resolverModel = require('../models/resolverModel');
const router = express.Router();
const initialStatus = "pending";

router.get('/createComplaint', isLoggedIn, async (req, res) => {
    const email = req.data;
    const user = await userModel.findOne({ email });
    res.render('user/createComplaint', { user });
})

router.post('/createComplaint', isLoggedIn, async (req, res) => {
    const { title, description, category, city, area, location, priority, userId } = req.body;
    const user = await userModel.findOne({ email: req.data });
    const resolver = await resolverModel.findOne({ city });
    try {
        const createdComplaint = await complaintModel.create({
            title,
            description,
            category,
            city,
            area,
            location,
            statusOC: "pending",
            priority,
            userId: user._id,
            resolverId: resolver._id
        })

        user.complaints.push(createdComplaint._id);
        resolver.complaints.push(createdComplaint._id);
        await user.save();
        await resolver.save();
        console.log({ user });
        console.log({ resolver });
        console.log({ createdComplaint });
    } catch (err) {
        console.log("tumhare area mein koi banda hi nahi hai ");
        return res.redirect('/user/dashboard');
    }
    return res.redirect('/user/dashboard');
})
module.exports = router; 