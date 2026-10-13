export type CaseStatus = 'open' | 'inProgress' | 'resolved';

export interface ICase {
    id: number;
    vehicleId: number;
    title: string;
    symptom: string;
    conditions: string;
    observations: string[];
    status: CaseStatus;
    reportedAt: string;

    createdAt: string;
    updatedAt: string;
}
