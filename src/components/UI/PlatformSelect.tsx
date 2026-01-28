"use client";

import { useAppContext } from "@/app/AppContext";
import textData from "@/data/textData.json";
import { getTrainPosition } from "../Helpers/Trains";
import { MoveCameraToStation, PanCameraToPlatform } from "../Helpers/Camera";
import { Vector3Tuple } from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrainTram } from "@fortawesome/free-solid-svg-icons";

const PlatformSelect = () => {
    const { 
        activeStation, 
        currentPlatform, 
        setCurrentPlatform, 
        trainsData, 
        nodes, 
        cameraControlsRef, 
        isMobile,
        isLoading, 
        error 
    } = useAppContext();

    const formatDestination = (dest: string) => {
        if (dest === "Brussels-South/Brussels-Midi") return "Brussel Zuid";
        return dest;
    };

    const handlePlatformChange = (platformNumber: string) => {
        if (!nodes) return;
        
        const platformPosition = getTrainPosition(
            platformNumber, 
            activeStation?.id || "", 
            nodes
        ) as Vector3Tuple;

        if (currentPlatform?.number === platformNumber) {
            setCurrentPlatform(null);
            if (activeStation?.id) {
                MoveCameraToStation(cameraControlsRef, activeStation, isMobile);
            }
            return;
        }

        setCurrentPlatform({
            number: platformNumber,
            position: platformPosition,
            stationId: activeStation?.id,
        });

        if (activeStation?.id && platformPosition) {
            PanCameraToPlatform(cameraControlsRef, platformPosition, activeStation);
        }
    };

    if (!activeStation) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="platform-panel glass">
                <h2>{activeStation.name}</h2>
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <p>Loading live data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="platform-panel glass">
                <h2>{activeStation.name}</h2>
                <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!trainsData || !trainsData.trains || trainsData.trains.length === 0) {
        return (
            <div className="platform-panel glass">
                <h2>{activeStation.name}</h2>
                <div className="platform-panel">
                    <h2>{textData.no_trains_message}</h2>
                </div>
            </div>
        );
    }

    const isSelectedTrain = (trainPlatform: string) => {
        return currentPlatform && currentPlatform.number === trainPlatform;
    }

    return (
        <div className="platform-panel glass">
            <h2>{activeStation.name}</h2>
            <div className="trains-list">
                {trainsData.trains.map((train, index) => (
                    <div
                        key={index}
                        className={`train-item ${
                            isSelectedTrain(train.platform)
                                ? "active"
                                : ""
                        }`}
                        onClick={() => handlePlatformChange(train.platform)}
                    >
                        <div className="destination">
                            <strong>{formatDestination(train.destination)}</strong>
                        </div>
                        <div className="details grid">
                            <span>
                            <FontAwesomeIcon icon={faTrainTram} />
                            {train.platform}
                            {" "}
                                <FontAwesomeIcon icon={faClock} />
                                {train.scheduledTime}
                            </span>
                            <span
                                className={
                                    !isSelectedTrain(train.platform)&& train.delay > 0
                                        ? "delay"
                                        : "hidden"
                                        
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
};

export default PlatformSelect;