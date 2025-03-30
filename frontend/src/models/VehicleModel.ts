export interface VehicleModel {
    id: number;
    brand: string;
    model: string;
    service_number: number;
    year: number;
    plate: string;
    color: string;
    fuel_type: string;
    client: number;
    image_url?: string;
}