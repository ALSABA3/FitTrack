const Router = require("express").Router;
const UserController = require("../controllers/user-controllers");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registration",
  body("email"),
  body("password"),
  UserController.registration
);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.get("/refresh", UserController.refresh);

router.get("/getUsers", authMiddleware, UserController.getUsers);

router.post("/getWorkoutsToday", authMiddleware,UserController.getWorkoutsToday);

router.post("/addWorkout", authMiddleware, UserController.addWorkout);

router.patch("/updateProfile", authMiddleware, UserController.updateProfile);

module.exports = router;
