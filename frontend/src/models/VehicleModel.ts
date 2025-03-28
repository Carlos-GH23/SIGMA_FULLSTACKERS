import { ClientModel } from "./ClientModel";

export interface VehicleModel {
    marca: string;
    modelo: string;
    numero_seguro: number;
    anio: number;
    matrícula: string;
    color: string;
    tipo_combustible: string;
    cliente: ClientModel;
}