import axios from "axios";

export class CrudService<T> {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    // Obtener todos los datos
    async getAll(): Promise<T[]> {
        try {
            const response = await axios.get<T[]>(this.url);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            throw error;
        }
    }

  // 🔹 Obtener un dato por ID
    async getById(id: number): Promise<T> {
        try {
            const response = await axios.get<T>(`${this.url}${id}/`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el dato:", error);
            throw error;
        }
    }

  // Crear un nuevo dato
    async create(data: T): Promise<T> {
        try {
            const response = await axios.post<T>(this.url, data);
            return response.data;
        } catch (error) {
            console.error("Error al crear el dato:", error);
            throw error;
        }
    }

  // Actualizar un dato por ID
    async update(id: number, data: Partial<T>): Promise<T> {
        try {
            const response = await axios.put<T>(`${this.url}${id}/`, data);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el dato:", error);
            throw error;
        }
    }

  // Eliminar un dato por ID
    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${this.url}${id}/`);
        } catch (error) {
            console.error("Error al eliminar el dato:", error);
            throw error;
        }
    }
}
