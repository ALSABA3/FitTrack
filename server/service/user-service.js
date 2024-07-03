const UserModel = require("../models/user-model.js");
const bcrypt = require("bcryptjs");
const TokenService = require("./token-service");
const WorkoutModel = require("../models/workout-model");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const ProfileModel = require("../models/Profile-model.js");



class UserService {
  async registrationService(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `User ${email} exist`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      email,
      password: hashPassword
    });

    await ProfileModel.create({
      email
    })

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("No user with this login was found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);
    console.log(userData);
    console.log(tokenFromDB);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getAllWorkoutsToday(email, date) {
    const user = await UserModel.findOne({ email });
    const thatDate = new Date(date);

    const startOfDay = new Date(
      thatDate.getFullYear(),
      thatDate.getMonth(),
      thatDate.getDate()
    );

    
    const workouts = await WorkoutModel.find({user: user.id, date: startOfDay}).select('_id category name sets reps weight duration');
    return workouts;
  }

  async addWorkout(email, workout) {
    const user = await UserModel.findOne({ email });  
    const date = new Date(workout.date);
    
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    await WorkoutModel.create({ user: user._id, ...workout, date: startOfDay });
  }
  
  async updateProfile(email, profile) {
    console.log(profile);
    await ProfileModel.findOneAndUpdate({email}, {
      email,
      ...profile
    });
  }
}

module.exports = new UserService();
