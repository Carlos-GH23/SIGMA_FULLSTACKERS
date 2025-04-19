import axios from "axios";
import { UserModel } from "../models/UserModel";
import { API_ENDPOINTS } from "../components/General/ApiConfig";

export const login = async (email: string, password: string) => {
    const response = await axios.post(API_ENDPOINTS.login, {email, password});
    console.log(response.data);
    console.log(response.data.user.role);
    if(response.data.access){
        const user: UserModel = response.data.user;
        const formattedUser: UserModel = {
            ...user,
            role: {
                id: response.data.user.role == "Admin" ? 1 : 2, 
                name: response.data.user.role
            }
        };
        localStorage.setItem("user", JSON.stringify(formattedUser));
        localStorage.setItem("accessToken",response.data.access);
        localStorage.setItem("refreshToken",response.data.refresh);
    }
    //window.location.reload();
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
    return user?.role?.name === "Admin";
};


export const isLoggedIn = (): boolean => {
    return getUser() !== null;
};