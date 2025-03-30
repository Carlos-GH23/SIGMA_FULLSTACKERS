/*import { VehicleModel } from "./VehicleModel";
import { DetailsModel } from "./DetailsModel";*/

export interface ServiceModel {
    id: number;
    name: string;
    description: string;
    date?: Date;
    cost: number;
    vehicle: number;

    /*fecha: Date;
    Vehículo: VehicleModel;
    tipo_servicio: string;
    descripción: string;
    costo: number;
    comentarios: string;
    detalles: DetailsModel;*/
}