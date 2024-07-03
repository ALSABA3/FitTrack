import express from 'express';
import Profile from '../models/profile.js';
import Pfp from '../models/pfp.js';
import { authenticateToken } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false); 
  }
};

const upload = multer({
  storage,
  fileFilter
});

//upload pfp
router.post("/pfp", authenticateToken, upload.single('image'), async (req, res) => {
    const newPfp = new Pfp({
        _id: req.decoded.id._id,
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      }
    );
    try{
        await newPfp.save()
        res.status(200).send({message: "image uploaded"})
    } catch(error) {
        res.status(400).send({message: error})
     }
})
//get pfp
router.get("/pfp", authenticateToken, async (req, res) => {
    try {
        const pfp = await Pfp.findById(req.decoded.id._id);
    
        if (!pfp) {
          return res.status(404).json({ error: 'Image not found' });
        }
    
        res.set('Content-Type', pfp.img.contentType);
        res.send(pfp.img.data);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
})

//update pfp


// create profile, used for the first time after signup
router.post("/", authenticateToken, async (req, res) => {
    
    const id = req.decoded.id._id
    const profile = new Profile({
        _id: id,
        profileName: req.body.profileName,
        dateofbirth: req.body.dateofbirth,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,

    })
    
    try{
        await profile.save();
        res.status(201).send({message: "profile created"})
    } catch(err){
        //console.error("Error saving profile:", err);
        res.status(500).send({message: err})
    }
} )

// edit profile
router.put("/", authenticateToken, async (req, res) => {
    try{
        await Profile.findByIdAndUpdate(req.decoded.id._id, {$set: req.body})
        res.status(200).send({message: "updated"})
    } 
    catch{
        res.status(400)
    }
})

// get profile
router.get("/", authenticateToken, async (req, res) => {
    try{
        const profile = await Profile.findById(req.decoded.id._id).select('profileName dateofbirth height weight gender')
        res.status(201).json(profile)
    } catch {
        res.status(500)
    }
})

// 



export default router;