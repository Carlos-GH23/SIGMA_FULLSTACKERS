import axios from "axios";
import { UserModel } from "../models/UserModel";

const API_URL = "http://127.0.0.1:8000/users/token/" //Se cambiara la URL a la indicada

export const login = async (email: string, password: string) => {
    const response = await axios.post(API_URL, {email, password});
    console.log(response.data);

    if(response.data.access){
        const user: UserModel = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken",response.data.access);
        localStorage.setItem("refreshToken",response.data.refresh);
    }
    window.location.reload();
    //return response.data;
}

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = "/";
    //window.location.reload();
}

export const getUser = (): UserModel | null => {
    const userJSON = localStorage.getItem("user");
    return userJSON ? JSON.parse(userJSON) as UserModel : null;
};

export const isAdmin = (): boolean => {
    const user = getUser();
    return user?.role === "admin";
};


export const isLoggedIn = (): boolean => {
    return getUser() !== null;
};