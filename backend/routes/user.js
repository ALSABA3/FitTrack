import express from "express";
import User from "../models/user.js";
import { isValidEmail } from "../helpers/validEmail.js";
import { isValidPassword } from "../helpers/validPassword.js";

const router = express.Router();

//signup user  ***after sign up must redirect to login and then profile create****
router.post("/signup", async (req, res) => {
  console.log(req.body.userEmail);
  const user = new User({
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  });

  if (isValidEmail(user.userEmail) == false) {
    res.status(400).json({ message: "invalid email" });
    return;
  }

  if (isValidPassword(user.userPassword) != true) {
    let err = isValidPassword(user.userPassword);
    res.status(400).json({ message: err });
    return;
  }
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get user by id. dont know if needed ?? doesnt work anymore
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//login user  should return jwt {UPDATE: login moved to authserver}
/*
router.post("/login", async (req, res) => {
    try{
        const exist = await User.exists({userEmail: req.body.userEmail, userPassword: req.body.userPassword})
        if(exist){
            console.log("user found")
        }
        else{
            res.status(400).send({message: "user not found"})
        }
    } catch(err) {
        res.status(400).send({message: err.message})
    }
})

*/

//delete user

//update user "password or email"

//middleware gets user by id
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

export default router;
