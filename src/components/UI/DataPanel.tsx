"use client";

import { useTrainData } from "../Helpers/GetData";

const DataPanel = ({ station }: { station?: string }) => {
    const { data, loading, error } = useTrainData(station);

    if (loading) {
        return (
            <div className="data-panel">
                <h2>Loading train data...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="data-panel">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!data || !data.trains.length) {
        return (
            <div className="data-panel">
                <h2>No train data available</h2>
            </div>
        );
    }

    return (
        <div className="data-panel">
            <h2>Departures from {data.station}</h2>
            <div className="trains-list">
                {data.trains.map((train, index) => (
                    <div key={index} className="train-item">
                        <div className="destination">
                            <strong>{train.destination}</strong>
                        </div>
                        <div className="details grid">
                            <span>Platform: {train.platform}</span>
                            <span>Time: {train.scheduledTime}</span>
                            <span
                                className={
                                    train.delay > 0 ? "delayed" : "on-time"
                                }
                            >
                                {train.delay > 0
                                    ? `+${Math.round(train.delay)} min`
                                    : "On time"}
                            </span>
                            <span>Train: {train.vehicleId}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataPanel;
