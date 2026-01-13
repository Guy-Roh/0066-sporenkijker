import { TrainData } from '../../app/type';

export const fetchTrainData = async (stationId: string): Promise<TrainData> => {

    const api = "dummy"; // Use dummy API for testing
/*     const api = "trains"
 */
    const response = await fetch(`api/${api}?stationId=${encodeURIComponent(stationId)}`);
        
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const result: TrainData = await response.json();
    return result;
};