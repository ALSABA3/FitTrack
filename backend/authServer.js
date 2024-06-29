
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from "./models/user.js"
dotenv.config()

const app = express()
const port = 5000
app.use(express.json());
const uri = process.env.DATA_BASE_KEY;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions);
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.post("/login", async (req, res) => {
    try{

        const exist = await User.exists({userEmail: req.body.userEmail, userPassword: req.body.userPassword})
        const userID = await User.findOne({userEmail: req.body.userEmail, userPassword: req.body.userPassword}, '_id')
        if(exist){
            const decoded = {id : userID};
            const accessToken = generateAccessToken(decoded)
            res.json({ accessToken: accessToken, message: "logged in"}).status(200)
        }
        else{
            res.status(400).send({message: "wrong login information"})
        }
    } catch(err) {
        res.status(500).send({message: err.message})
    }
})



export function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

app.listen(port, () => {
    console.log(`Authserver listening at http://localhost:${port}`)
})