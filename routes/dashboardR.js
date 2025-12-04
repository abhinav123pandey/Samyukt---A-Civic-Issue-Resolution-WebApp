const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const resolverModel = require('../models/resolverModel');
const complaintModel = require('../models/complaint');
const router = express.Router();


router.get('/dashboard', isLoggedIn, async (req, res) => {
    const email = req.data;
    const resolver = await resolverModel.findOne({ email });
    let pending = 0;
    let inProgress = 0;
    let resolved = 0;
    for (const complaintId of resolver.complaints){
        try {
            const compl = await complaintModel.findOne({_id:complaintId});
            if (compl.statusOC == "pending") {
                pending++;
            }
            else if (compl.statusOC == "resolved") {
                resolved++;
            }
            else {
                inProgress++;
            }
        } catch (err) {
            console.error('err fetching complaint', complaintId, err);
        }
    }
    res.render('resolver/dashboard', { resolver, pending, resolved, inProgress });
})

module.exports = router; 