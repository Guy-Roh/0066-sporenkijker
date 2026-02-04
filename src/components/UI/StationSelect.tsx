import { useAppContext } from "@/app/AppContext";
import { Station } from "@/app/type";
import textData from "@/data/textData.json";
import { MoveCameraToStation, ResetCamera } from "../Helpers/Camera";
import stationData from "@/data/stationData.json";
import { CleanId } from "../Helpers/Trains";
import { Vector3Tuple } from "three";

const StationSelect = () => {
    const {
        activeStation,
        setActiveStation,
        nodes,
        cameraControlsRef,
        isMobile,
        setTrainsData,
        setError,
        isLoading,
        error,
        cameraOffset
    } = useAppContext();

    const handleStationChange = async (stationId: string) => {
        if (activeStation?.id === stationId) {
            setActiveStation(null);
            setTrainsData(null);
            setError(null);
            ResetCamera(cameraControlsRef, isMobile, false);
            return;
        }

        const selectedStation = stationData.allStations.find(
            (station) => station.id === stationId
        ) as Station | undefined;

        if (!selectedStation) return;

        const stationNode = nodes ? nodes[CleanId(stationId)] : null;

        const calculateOffset = () => {
            const xOffset = 6 * Math.tan(stationNode?.rotation.y as number)
            return xOffset as number;
            // Adjust X offset based on station empty rotation, this makes sure that the camera is always aligned with the platforms
        }

        const targetStation: Station = stationNode

            ? {
                ...selectedStation,
                position: [
                    stationNode.position.x,
                    stationNode.position.y,
                    stationNode.position.z,
                ],
                offset: {
                    desktop: selectedStation.offset?.desktop as Vector3Tuple,
                    mobile: selectedStation.offset?.mobile as Vector3Tuple,
                    selectedPlatform: [
                        calculateOffset(), 
                        1.6,
                        6
                    ],
                },
            }
            : selectedStation;

        setActiveStation(targetStation);
        MoveCameraToStation(cameraControlsRef, targetStation, isMobile);

    };

    return (
        <div>
            <h3>{textData.main_panel_title}</h3>

            {isLoading && <p>Loading data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="station-select">
                {stationData.allStations.map((station) => (
                    <button
                        key={station.id}
                        disabled={isLoading}
                        onClick={() => handleStationChange(station.id)}
                        className={
                            activeStation?.id === station.id
                                ? "active"
                                : ""
                        }
                    >
                        {station.name}
                    </button>
                ))}
            </div>
            <span className="offset">
                {cameraOffset
                    ? `Camera Offset: x:${cameraOffset[0].toFixed(2)} y:${cameraOffset[1].toFixed(2)} z:${cameraOffset[2].toFixed(2)}`
                    : 'Camera Offset: N/A'}
            </span>
        </div>
    );
};

export default StationSelect;
