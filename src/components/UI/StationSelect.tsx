import { useAppContext } from "@/app/AppContext";
import { Station } from "@/app/type";
import textData from "@/data/textData.json";
import { fetchTrainData } from "../Helpers/GetData";
import { MoveCameraToStation, ResetCamera } from "../Helpers/Camera";
import stationData from "@/data/stationData.json";
import { CleanId } from "../Helpers/Trains";

const StationSelect = () => {
    const {
        activeStation,
        setActiveStation,
        nodes,
        cameraControlsRef,
        isMobile,
        setTrainsData,
        setIsLoading,
        setError,
        isLoading,
        error,
    } = useAppContext();

    const handleStationChange = async (stationId: string) => {
        // If clicked station is already active, unset it and reset camera
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

        const targetStation: Station = stationNode
            ? {
                  ...selectedStation,
                  position: [
                      stationNode.position.x,
                      stationNode.position.y,
                      stationNode.position.z,
                  ],
              }
            : selectedStation;

        setActiveStation(targetStation);
        MoveCameraToStation(cameraControlsRef, targetStation, isMobile);

        // Fetch train data
        setIsLoading(true);
        setError(null);
        setTrainsData(null);

        try {
            const data = await fetchTrainData(targetStation.id);
            setTrainsData(data);
        } catch (err) {
            setError("Failed to load train data");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h3>{textData.main_panel_title}</h3>

            {isLoading && <p>Loading data...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

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
        </div>
    );
};

export default StationSelect;
