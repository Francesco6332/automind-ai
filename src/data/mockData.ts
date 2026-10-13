import type { ICase } from '../types/CaseInterface';
import type { IVehicle } from '../types/VehicleInterface';

// Static demo data: nothing here is calculated or saved yet.

export const selectedVehicle: IVehicle = {
    id: 1,
    brand: 'Fiat',
    model: 'Panda Hybrid',
    year: 2021,
    mileage: 48200,
    powerHp: 70,
    fuelType: 'Hybrid',
    trasmissionType: 'Manual',

    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-10-08T10:00:00Z',
};

export const openCasesSummary = '2 casi aperti';

export const recentCases: ICase[] = [
    {
        id: 1,
        vehicleId: 1,
        title: 'Rumore in frenata',
        symptom: 'Stridio metallico quando freno a bassa velocità.',
        conditions: 'Soprattutto al mattino e dopo la pioggia, in città sotto i 30 km/h.',
        observations: [
            'Usura delle pastiglie dei freni',
            'Dischi ossidati o rigati',
            'Corpi estranei tra pastiglia e disco',
        ],
        status: 'open',
        reportedAt: '2026-10-08',
        createdAt: '2026-10-08T09:12:00Z',
        updatedAt: '2026-10-08T09:12:00Z',
    },
    {
        id: 2,
        vehicleId: 1,
        title: 'Spia motore',
        symptom: 'Spia arancione accesa dopo l\'avvio a freddo.',
        conditions: 'Compare nei primi minuti di guida e resta accesa; nessun calo di potenza percepito.',
        observations: [
            'Sensore o sonda lambda da controllare',
            'Tappo del serbatoio non chiuso correttamente',
            'Lettura dei codici errore con diagnosi OBD',
        ],
        status: 'inProgress',
        reportedAt: '2026-10-02',
        createdAt: '2026-10-02T18:40:00Z',
        updatedAt: '2026-10-05T11:00:00Z',
    },
    {
        id: 3,
        vehicleId: 1,
        title: 'Vibrazione in accelerazione',
        symptom: 'Il volante vibra oltre i 90 km/h.',
        conditions: 'In autostrada, aumenta in accelerazione e sparisce sotto gli 80 km/h.',
        observations: [
            'Equilibratura delle ruote',
            'Pneumatici deformati o usurati in modo irregolare',
            'Giunti o semiassi da ispezionare',
        ],
        status: 'resolved',
        reportedAt: '2026-09-21',
        createdAt: '2026-09-21T08:05:00Z',
        updatedAt: '2026-09-28T16:30:00Z',
    },
];
