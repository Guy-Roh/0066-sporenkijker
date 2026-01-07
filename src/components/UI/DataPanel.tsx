"use client";

import { useAppContext } from "@/app/AppContext";
import { useTrainData } from "../Helpers/GetData";
import textData from "@/data/textData.json";

const DataPanel = () => {
    const { activeStation, currentPlatform, setCurrentPlatform } = useAppContext();
    const { trainsData, loading, error } = useTrainData(
        activeStation?.id as string
    );
    if (activeStation || trainsData) {
        if (loading) {
            return (
                <div className="data-panel">
                    <h2>{textData.loading_message}</h2>
                </div>
            );
        }

        if (error) {
            return (
                <div className="data-panel">
                    <h2>{textData.error_message}</h2>
                    <p>{error}</p>
                </div>
            );
        }

        if (!trainsData || !trainsData.trains.length) {
            return (
                <div className="data-panel">
                    <h2>{textData.no_trains_message}</h2>
                </div>
            );
        } else {
            return (
                <div className="data-panel">
                    <h2>{activeStation?.name}</h2>
                    <div className="trains-list">
                        {trainsData.trains.map((train, index) => (
                            <div key={index} className="train-item">
                                <div className="destination">
                                    <strong>{train.destination}</strong>
                                </div>
                                <div className="details grid">
                                    <span>
                                        {textData.platform}: {train.platform}
                                    </span>
                                    <span>
                                        {textData.departure_time}:{" "}
                                        {train.scheduledTime}
                                    </span>
                                    <span
                                        className={
                                            train.delay > 0
                                                ? "delayed"
                                                : "on-time"
                                        }
                                    >
                                        {train.delay > 0
                                            ? `+${Math.round(train.delay)} min`
                                            : "Op tijd"}
                                    </span>
                                    {/*                             <span>Train: {train.vehicleId}</span>
                                     */}{" "}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
};

export default DataPanel;
