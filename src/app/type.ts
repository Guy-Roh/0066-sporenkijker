export interface Platform {
    number: string;
    position: [number, number, number];
    stationId?: string;
}

export interface Station {
    name: string;
    id: string;
    number: string;
    position?: [number, number, number];
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