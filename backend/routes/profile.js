import express from 'express'
import Profile from '../models/profile.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();


// create profile, used for the first time after signup

router.post("/create", authenticateToken, async (req, res) => {
    const id = req.decoded.id._id
    const profile = new Profile({
        userID: id,
        profileName: req.body.profileName,
        dateofbirth: req.body.dateofbirth,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender

    })
    
    try{
        await profile.save();
        res.status(201).send({message: "profile created"})
    } catch{
        res.status(500)
    }
} )
// edit profile
router.put("/", authenticateToken, async (req, res) => {

})

// get profile
router.get("/", authenticateToken, async (req, res) => {
    try{
        const profile = await Profile.findOne({userID : req.decoded.id._id}).select('profileName dateofbirth height weight gender')
        res.status(201).json(profile)
    } catch {
        res.status(500)
    }
})

// 


export default router;