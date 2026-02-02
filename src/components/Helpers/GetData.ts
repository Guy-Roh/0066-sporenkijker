import { TrainData } from '../../app/type';

export const fetchTrainData = async (stationId: string): Promise<TrainData> => {

    //const api = "dummy"; // Use dummy API for testing
    const api = "trains"

    const response = await fetch(`api/${api}?stationId=${encodeURIComponent(stationId)}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    const result: TrainData = await response.json();
    if(result.trains.length === 0){
        //sometimes this API returns an empty array but the data is fetched. So we just need to double check and if it is empty on the second try, we accept it.
        const retryResponse = await fetch(`api/${api}?stationId=${encodeURIComponent(stationId)}`, {
            cache: 'no-store'
        });

        if (!retryResponse.ok) {
            throw new Error(`Failed to fetch on retry: ${retryResponse.status}`);
        }

        const retryResult: TrainData = await retryResponse.json();
        return retryResult;
    }
    
    return result;
};