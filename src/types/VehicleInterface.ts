export interface IVehicle{
    id: number;
    brand: string;
    model: string; 
    year: number;
    mileage: number;
    powerHp: number;
    fuelType: 'Diesel' | 'Gasoline' | 'Electric' | 'Hybrid';
    trasmissionType: 'Manual' | 'Automatic';
    
    engineDisplacement?: number;
    power_kW?: number;
    version?: string;
    registrationDate?: string;
    insuranceExpirationDate?: string;
    roadTaxExpirationDate?: string;
    lastServiceDate?: string;
    lastServiceMileage?: number;

    createdAt: string;
    updatedAt: string;
}