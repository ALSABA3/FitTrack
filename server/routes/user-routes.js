const Router = require("express").Router;
const UserController = require("../controllers/user-controllers");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registration",
  body("username").isLength({ min: 3, max: 20 }),
  body("password").isLength({ min: 5, max: 32 }),
  UserController.registration
);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.get("/refresh", UserController.refresh);

router.get("/getUsers", authMiddleware, UserController.getUsers);

router.post("/getWorkoutsToday", UserController.getWorkoutsToday); //authMiddleware

router.post("/addWorkout", UserController.addWorkout); //authMiddleware


module.exports = router;
