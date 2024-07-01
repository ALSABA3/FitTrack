import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";
import { BotResponse } from "../models/response/BotResponse";
import { IWorkout } from "@/models/IWorkout";
import { WorkoutModel } from "@/models/Workout";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
    return $api.get<IUser[]>('/getUsers'); //Доделать, возвращаются сразу несколько
  }

  static useToken(username: string): Promise<AxiosResponse<BotResponse>>{
    return $api.patch<BotResponse>('/useToken', {username});
  }

  static getWorkoutsToday(username: string, date: Date): Promise<AxiosResponse<IWorkout[]>>{
    return $api.post<IWorkout[]>('/getWorkoutsToday', {username, date});
  }

  static async addWorkout(username: string, workout:WorkoutModel){
    await $api.post('/addWorkout', {username, workout});
  }

  
}
