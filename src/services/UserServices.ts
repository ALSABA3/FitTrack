import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IWorkout } from "@/models/IWorkout";
import { WorkoutModel } from "@/models/Workout";
import { IProfile } from "@/models/IProfile";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
    return $api.get<IUser[]>('/getUsers');
  }

  static getWorkoutsToday(email: string, date: Date): Promise<AxiosResponse<IWorkout[]>>{
    return $api.post<IWorkout[]>('/getWorkoutsToday', {email, date});
  }

  static async addWorkout(email: string, workout:WorkoutModel){
    await $api.post('/addWorkout', {email, workout});
  }

  static async updateProfile(email: string, profile: IProfile){
    await $api.patch('/updateProfile', {email, profile});
  }

  
}
