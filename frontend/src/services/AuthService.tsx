import axios from "axios";

const API_URL = "http://127.0.0.1:8000/login/"

export const login = async (email: string, password: string) => {
    const response = await axios.post(API_URL, {email,password});
    if(response.data.access){
        //Guardar el token en React
        //localStorage.setItem("accessToken",response.data.access);
        //localStorage.setItem("refreshToken",response.data.refresh);
    }
    return response.data;
}

export const logout = () => {
    //localStorage.removeItem('accessToken');
    //localStorage.removeItem('refreshToken');
    window.location.reload(); // Recargar para actualizar estado
}

export const isAdmin = (role: string) => {
    return role === "admin";
}