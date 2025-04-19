export const API_WEB_URL = "https://mirko3423.pythonanywhere.com";
export const API_LOCAL_URL = "http://127.0.0.1:8000";

const API_ENDPOINTS_WEB = {
    login: `${API_WEB_URL}/users/token/`,
    users: `${API_WEB_URL}/users/api/`,
    cars: `${API_WEB_URL}/vehiculo/api/`,
    clients: `${API_WEB_URL}/cliente/api/`,
    services: `${API_WEB_URL}/vehiculo/servicio/api/`,
    resertPassword: `${API_WEB_URL}/users/password-reset/`,
    refresh: `${API_WEB_URL}/users/token/refresh/`,
    // Agrega más endpoints aquí según necesites
};

const API_ENDPOINTS_LOCAL = {
    login: `${API_LOCAL_URL}/users/token/`,
    users: `${API_LOCAL_URL}/users/api/`,
    cars: `${API_LOCAL_URL}/vehiculo/api/`,
    clients: `${API_LOCAL_URL}/cliente/api/`,
    services: `${API_LOCAL_URL}/vehiculo/servicio/api/`,
    resertPassword: `${API_LOCAL_URL}/users/password-reset/`,
    refresh: `${API_LOCAL_URL}/users/token/refresh/`,
    // Agrega más endpoints aquí según necesites
};

export const API_ENDPOINTS = API_ENDPOINTS_WEB //API_ENDPOINTS_LOCAL;