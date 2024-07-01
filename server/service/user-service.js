const UserModel = require("../models/user-model.js");
const bcrypt = require("bcryptjs");
const TokenService = require("./token-service");
const WorkoutModel = require("../models/workout-model");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registrationService(username, password) {
    const candidate = await UserModel.findOne({ username });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с именем ${username} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      username,
      password: hashPassword
    });

    const userDto = new UserDto(user); //хранить _id из базы, что мы будем хранить в токене

    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken); //Кидает в БД(Токен ветку) токены

    return { ...tokens, user: userDto };
  }

  async login(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким логином не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken); //Кидает в БД(Токен ветку) токены

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

  async getAllWorkoutsToday(username, date) {
    const user = await UserModel.findOne({ username });
    const thatDate = new Date(date);

    const startOfDay = new Date(
      thatDate.getFullYear(),
      thatDate.getMonth(),
      thatDate.getDate()
    );

    
    const workouts = await WorkoutModel.find({user: user.id, date: startOfDay}).select('_id category name sets reps weight duration');
    return workouts;
  }

  async addWorkout(username, workout) {
    const user = await UserModel.findOne({ username });  
    const date = new Date(workout.date);
    
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    await WorkoutModel.create({ user: user._id, ...workout, date: startOfDay });
  }
  
}

module.exports = new UserService();
