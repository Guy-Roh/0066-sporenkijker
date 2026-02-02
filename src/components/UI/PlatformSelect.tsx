"use client";

import { useAppContext } from "@/app/AppContext";
import textData from "@/data/textData.json";
import { getTrainPosition } from "../Helpers/Trains";
import { MoveCameraToStation, PanCameraToPlatform } from "../Helpers/Camera";
import { Vector3Tuple } from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrainTram } from "@fortawesome/free-solid-svg-icons";
import { fetchTrainData } from "../Helpers/GetData";
import { useCallback, useEffect } from "react";
import { Train } from "@/app/type";
import Loading from "./Loading";

const PlatformSelect = () => {
    const {
        activeStation,
        currentPlatform,
        setCurrentPlatform,
        trainsData,
        nodes,
        cameraControlsRef,
        isMobile,
        setTrainsData,
        setIsLoading,
        setError,
        isLoading,
        error
    } = useAppContext();

    const handleStationChange = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setTrainsData(null);

        try {
            if (!activeStation) {
                setError("No active station selected");
                setIsLoading(false);
                return;
            }
            const data = await fetchTrainData(activeStation.id);

            // Sort trains by platform number
            if (data?.trains) {
                data.trains.sort((a: Train, b: Train) =>
                    a.platform.toString().localeCompare(b.platform.toString(), undefined, { numeric: true })
                );

            }

            setTrainsData(data);
        } catch (err) {
            setError("Failed to load train data");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [activeStation, setError, setIsLoading, setTrainsData]);

    useEffect(() => {
        if (activeStation) {
            handleStationChange();
        }
        setCurrentPlatform(null);

    }, [activeStation, handleStationChange, setCurrentPlatform]);



    const formatDestination = (dest: string) => {
        if (dest === "Brussels-South/Brussels-Midi") return "Brussel Zuid";
        if (dest === "Brussels Airport - Zaventem") return "Brussels Airport";
        if (dest === "Antwerp-Central") return "Antwerpen Centraal";
        if (dest === "Bruges") return "Brugge";
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
                    <Loading />
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
                        className={`train-item ${isSelectedTrain(train.platform)
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
                                    isSelectedTrain(train.platform) && train.delay > 0
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