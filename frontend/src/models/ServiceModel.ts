import { VehicleModel } from "./VehicleModel";
import { DetailsModel } from "./DetailsModel";

export interface ServiceModel {
    fecha: Date;
    Vehículo: VehicleModel;
    tipo_servicio: string;
    descripción: string;
    costo: number;
    comentarios: string;
    detalles: DetailsModel;
}