"use client";

import { useAppContext } from "@/app/AppContext";
import { Platform } from "@/app/type";
import textData from "@/data/textData.json";
import { getTrainPosition } from "../Helpers/Trains";

const PlatformSelect = () => {
    const { activeStation, currentPlatform, setCurrentPlatform, trainsData, nodes } =
        useAppContext();

    const handlePlatformChange = (platformNumber: string) => {
        setCurrentPlatform({
            number: platformNumber,
            position: getTrainPosition(platformNumber, activeStation?.id || "", nodes) as [number, number, number],
        });
        console.log();
    };

    if (activeStation || trainsData) {
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
                            <div
                                key={index}
                                className={`train-item ${
                                    currentPlatform?.number === train.platform
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    handlePlatformChange(train.platform)
                                }
                            >
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

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
};

export default PlatformSelect;
