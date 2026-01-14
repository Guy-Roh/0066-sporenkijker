import { Object3D } from "three";

export interface Platform {
    number: string;
    position: [number, number, number];
    stationId?: string;
}

export type NodesMap = Record<string, Object3D>;

export interface Station {
    name: string;
    id: string;
    position?: [number, number, number];
    offset?: {
        x: number;
        y: number;
        z: number;
    };
}

export interface Train {
    destination: string;
    platform: string;
    scheduledTime: string;
    delay: number;
    vehicleId: string;
    position?: [number, number, number];
}

export interface TrainData {
    station: string;
    trains: Train[];
}

export interface UseTrainDataResult {
    trainsData: TrainData | null;
    loading: boolean;
    error: string | null;
}