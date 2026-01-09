import { useState, useEffect } from 'react';

import { TrainData, UseTrainDataResult } from '../../app/type';
import { useAppContext } from '@/app/AppContext';

export const useTrainData = (stationId: string ): UseTrainDataResult => {
    const { trainsData, setTrainsData } = useAppContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrainData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`/api/dummy?stationId=${encodeURIComponent(stationId)}`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }
                
                const result: TrainData = await response.json();
                setTrainsData?.(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainData();
        
        // Refresh data every 5 minutes
        const interval = setInterval(fetchTrainData, 300000);
        
        return () => clearInterval(interval);
    }, [stationId]);

    console.log('useTrainData:', trainsData);

    return { trainsData: trainsData ?? null, loading, error };
};