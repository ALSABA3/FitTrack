const UserService = require("../service/user-service");
const ApiError = require("../exceptions/api-error");
const { validationResult } = require("express-validator");
const isValidEmail = require("../helpers/validEmail");
const isValidPassword = require("../helpers/validPassword");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Validation error", errors.array())
        );
      }

      const { email, password } = req.body;

      if (isValidEmail(email) == false){
        return next(
          ApiError.BadRequest("invalid email")
        );
      }
    
      if (isValidPassword(password) != true){
          return next(
            ApiError.BadRequest("invalid password")
          );
      }

      const userData = await UserService.registrationService(
        email,
        password
      );

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);

      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

 
  async getWorkoutsToday(req, res, next) {
    try {
      const { email, date} = req.body;
      const workouts = await UserService.getAllWorkoutsToday(email, date);
      return res.json(workouts);
    } catch (e) {
      next(e);
    }
  }

  async addWorkout(req, res, next) {
    try {
      const { email, workout} = req.body;
      await UserService.addWorkout(email, workout);

      return res.json();
    } catch (e) {
      next(e);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const {email, profile} = req.body;
      await UserService.updateProfile(email, profile);

      return res.json();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
