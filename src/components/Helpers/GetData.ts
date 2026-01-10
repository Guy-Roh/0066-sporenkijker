import { TrainData } from '../../app/type';

export const fetchTrainData = async (stationId: string): Promise<TrainData> => {
    const response = await fetch(`/api/trains?stationId=${encodeURIComponent(stationId)}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const result: TrainData = await response.json();
    return result;
};