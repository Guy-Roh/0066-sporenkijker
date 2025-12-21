import { useState, useEffect } from 'react';

interface Train {
    destination: string;
    platform: string;
    scheduledTime: string;
    delay: number;
    vehicleId: string;
}

interface TrainData {
    station: string;
    trains: Train[];
}

interface UseTrainDataResult {
    data: TrainData | null;
    loading: boolean;
    error: string | null;
}

export const useTrainData = (station: string = 'Antwerpen-Centraal'): UseTrainDataResult => {
    const [data, setData] = useState<TrainData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrainData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`/api/trains?station=${encodeURIComponent(station)}`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                
                const result: TrainData = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainData();
        
        // Refresh data every 30 seconds
        const interval = setInterval(fetchTrainData, 300000);
        
        return () => clearInterval(interval);
    }, [station]);

    return { data, loading, error };
};