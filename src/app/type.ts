import { Object3D, Vector3Tuple } from "three";

//Vector3Tuple type is just [number, number, number]
export interface Platform {
    number: string;
    position: Vector3Tuple;
    stationId?: string;
}


export type NodesMap = Record<string, Object3D>;

export interface Station {
    name: string;
    id: string;
    position?: Vector3Tuple;
    rotation?: Vector3Tuple;
    offset?: {
        desktop: Vector3Tuple;
        mobile: Vector3Tuple;
        selectedPlatform: Vector3Tuple;
    };
}

export interface Train {
    destination: string;
    platform: string;
    scheduledTime: string;
    delay: number;
    vehicleId: string;
    position?: Vector3Tuple;
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