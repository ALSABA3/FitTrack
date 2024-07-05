import express from "express"
import Workout from "../models/workout.js";
import Exercise from "../models/exercise.js";
import { authenticateToken } from '../middleware/auth.js';


const router = express.Router();

//get workout needs rework
router.get("/:wdate", authenticateToken, async (req, res) => {
    const wdate = new Date(req.params.wdate);
    const startOfDay = new Date(wdate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(wdate.setHours(23, 59, 59, 999));
    try{
        const workout = await Workout.findOne({
            userId: req.decoded.id._id,
            date: {
              $gte: startOfDay,
              $lte: endOfDay
            }
        })
        res.status(200).json(workout)
    }catch{
        res.status(500).message({message: "server error"})
    }
})
//post workout
router.post("/", authenticateToken, async (req, res) => {
    const workout = new Workout({
        userId: req.decoded.id._id,
        date: req.body.date,
        exercises: req.body.exercises
    })
    try{
        await workout.save()
        res.status(201).send({message: "created workout"})
    }catch(err){
        res.status(500).send({message: "sever error"})
    }
})

//get which days have been worked out in specific month
router.get("/:year/:month", authenticateToken, async (req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
    try {
        const workoutlist = await Workout.find({
            userId: req.decoded.id._id,
            
            date: {
              $gte: startOfMonth,
              $lte: endOfMonth
            }
        }, "date _id")
        res.status(200).json(workoutlist)
    } catch(err) {
        res.status(500).send({message: err})
    }
})

//delete workout
router.delete("/", authenticateToken, async (req, res) => {

})

//get all exercises
router.get("/exercises", async (req, res)=>{
    try { 
        const exercise = await Exercise.find()
        res.status(200).json(exercise)
    } catch {
        res.status(500).send({message: "server error"})
    }
})
//update workout.... basicaly delete and post
//not needed
export default router;