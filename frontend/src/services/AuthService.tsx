import axios from "axios";
import { UserModel } from "../models/UserModel";

const API_URL = "http://127.0.0.1:8000/users/api/1/" //Se cambiara la URL a la indicada

export const login = async (email: string, password: string) => {
    console.log(email);
    console.log(password);
    const response = await axios.get(API_URL);
    console.log(response.data);

    if(response.data){
        const user: UserModel = response.data;
        console.log("user: " + user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    return response.data;
}

export const logout = () => {
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
    const roles = Array.isArray(user?.role) ? user.role : [user?.role];

    return roles.some((r) => r?.name === "admin");
};


export const isLoggedIn = (): boolean => {
    return getUser() !== null;
};