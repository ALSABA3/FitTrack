import express from "express"
import Blog from "../models/blog.js"
import Profile from "../models/profile.js"
import User from "../models/user.js"
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

//add blog

router.post("/", authenticateToken, async (req, res) => {
    try{
        const role = await User.findById(req.decoded.id._id).select("role")
        if(role.role == "admin") {
            try{
                const authorName = await Profile.findById(req.decoded.id._id).select('profileName')
                
                const newBlog = new Blog({
                    title: req.body.title,
                    content: req.body.content,
                    description: req.body.description,
                    img: req.body.img,
                    author: authorName.profileName,
                    category: req.body.category
        
                })
                try{
                    await newBlog.save();
                    res.status(201).send({message: "blog created"})
                } catch{
                    res.status(500)
                }
            } catch(err) { 
                console.log(err)
                res.status(500).send({message: "server error"})
            }
            
            
        }
        else{ 
            res.status(401).send({message: "not an admin"})
        }
    } catch {
        res.status(500).send({message: "server error"})
    }
    
    
})

//get blog
router.get("/:id", async (req, res) => { 
    try{
        const blog = await Blog.findById(req.params.id).select('title author category description content img')
        res.status(200).json(blog)
    } catch {
        res.status(400).send({message: "bad request"})
    }
})

router.get("/", async (req, res) => {
    try{
        const blogs = await Blog.find({}, 'title description img _id category')
        res.status(200).json(blogs)
    }catch {
        res.status(500).send({message: "system error"})
    }
})

export default router;