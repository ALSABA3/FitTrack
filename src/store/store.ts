import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";
import UserService from "@/services/UserServices";
import { WorkoutModel } from "@/models/Workout";
import { useNavigate } from "react-router-dom";
import { IProfile } from "@/models/IProfile";
  


export default class Store{
    
    user = {} as IUser;
    profile = {} as IProfile;
    isAuth = false;
    isLoading = false;

    constructor(){
        makeAutoObservable(this);
    }

    setUser(user: IUser){
        this.user = user;
    }

    setProfile(profile: IProfile){
        this.profile = profile;
    }

    setAuthStatus(status: boolean){
        this.isAuth = status;
    }

    setLoading(status: boolean){
        this.isLoading = status;
    }

    async login(email: string, password: string){
        try{        
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);   
            this.setAuthStatus(true);
            useNavigate()("/Dashboard");
        } catch(e){
                if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);         
            }
        }
    }
    
    async registration(email: string, password: string){
        try{
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user); 
            this.setAuthStatus(true);
            return true;
        } catch(e){
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);         
            }
        }
    }
    
    async logout(){
        try{
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setUser({}as IUser);   
            this.setAuthStatus(false);
        } catch(e){
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);         
            }
        }
    }

    async checkAuth(){
        this.setLoading(true);
        try{
            
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});          
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
            this.setAuthStatus(true);
            console.log(this.isAuth)
        }
        catch(e){
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);         
            }
        } finally{
            this.setLoading(false);
        }
    }

    async addWorkout(workout: WorkoutModel){
        try{ 
            await UserService.addWorkout(this.user.email, workout);
        } catch(e){
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);         
            }
        }
    }

    async updateProfile(profile: IProfile){
        try{ 
            await UserService.updateProfile(this.user.email, profile);
            return true;
        } catch(e){
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);         
            }
        }
    }

    async getWorkoutsToday(){
        try{
            return await UserService.getWorkoutsToday(this.user.email, new Date());
        } catch(e){
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);         
            }
        }
    }
}