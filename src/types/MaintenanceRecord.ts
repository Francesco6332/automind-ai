export interface IMaintenanceRecord {
    id: number;
    vehicleId: number;
    serviceDate: string;
    serviceMileage: number;
    serviceDescription: string;
    serviceCost: number;

    createdAt: string;
    updatedAt: string;
}