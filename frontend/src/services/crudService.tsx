import axios from "axios";
import { API_ENDPOINTS } from "../components/General/ApiConfig";

export class CrudService<T> {
    private url: string;
    private token: string | null;

    constructor(url: string) {
        this.url = url;
        this.token = localStorage.getItem("accessToken");
    }

    private getHeaders() {
        return {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        };
    }

    private async refreshToken() {
        try {
            const refresh = localStorage.getItem("refreshToken");
            if (!refresh) throw new Error("No se pudo actualizar el token");
            const response = await axios.post(API_ENDPOINTS.refresh, { refresh });
            console.log("Token actualizado 1:", response);
            console.log("Token actualizado 2:", response.data);
            console.log("Token actualizado 3:", response.data.access);
            localStorage.setItem("accessToken", response.data.access);
            return true;
        } catch (error) {
            console.error("Error al refrescar el token", error);
            throw error;
        }
    }

    private async requestWithRetry<T>(request: () => Promise<T>): Promise<T> {
        try {
            return await request();
        } catch (error: any) {
            if (error.response?.status === 401) { // Token expirado
                const newAccessToken = await this.refreshToken();
                if (newAccessToken) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return await request();
                }
            }
            throw error;
        }
    }

    // Obtener todos los datos
    async getAll(): Promise<T[]> {
        try {
            /*const response = await axios.get<T[]>(this.url, this.getAuthHeaders());
            return response.data;*/
            return this.requestWithRetry(() => axios.get<T[]>(this.url, this.getHeaders()).then(res => res.data));
            
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            throw error;
        }
    }

  // 🔹 Obtener un dato por ID
    async getById(id: number): Promise<T> {
        try {
            /*const response = await axios.get<T>(`${this.url}${id}/`, this.getAuthHeaders());
            return response.data;*/
            return this.requestWithRetry(() => axios.get<T>(`${this.url}${id}/`, this.getHeaders()).then(res => res.data));
        } catch (error) {
            console.error("Error al obtener el dato:", error);
            throw error;
        }
    }

  // Crear un nuevo dato
    async create(data: T): Promise<T> {
        try {
            /*const response = await axios.post<T>(this.url, data, this.getAuthHeaders());
            return response.data;*/
            return this.requestWithRetry(() => axios.post<T>(this.url, data, this.getHeaders()).then(res => res.data));
        } catch (error) {
            console.error("Error al crear el dato:", error);
            throw error;
        }
    }

  // Actualizar un dato por ID
    async update(id: number, data: Partial<T>): Promise<T> {
        try {
            /*const response = await axios.put<T>(`${this.url}${id}/`, data, this.getAuthHeaders());
            return response.data;*/
            return this.requestWithRetry(() => axios.put<T>(`${this.url}${id}/`, data, this.getHeaders()).then(res => res.data));
        } catch (error) {
            console.error("Error al actualizar el dato:", error);
            throw error;
        }
    }

  // Eliminar un dato por ID
    async delete(id: number): Promise<void> {
        try {
            /*await axios.delete(`${this.url}${id}/`, this.getAuthHeaders());*/
            return this.requestWithRetry(() => axios.delete(`${this.url}${id}/`, this.getHeaders()).then(() => {}));
        } catch (error) {
            console.error("Error al eliminar el dato:", error);
            throw error;
        }
    }
}
