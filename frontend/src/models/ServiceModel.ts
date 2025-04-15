export interface ServiceModel {
    id: number;
    name: string;
    description: string;
    date?: Date;
    cost: number;
    vehicle: number;
    image_url?: string;
    next_service?: Date;
}