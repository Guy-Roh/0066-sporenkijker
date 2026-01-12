import { useAppContext } from "@/app/AppContext";
import { Station } from "@/app/type";
import textData from "@/data/textData.json";
import { fetchTrainData } from "../Helpers/GetData";
import { MoveCameraToStation, ResetCamera } from "../Helpers/Camera";
import stationData from "@/data/stationData.json";

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

    const handleStationChange = async (stationNumber: string) => {
        // If clicked station is already active, unset it and reset camera
        if (activeStation?.number === stationNumber) {
            setActiveStation(null);
            setTrainsData?.(null);
            ResetCamera(cameraControlsRef, isMobile);
            return;
        }

        // Reset error and start loading
        setError(null);
        setIsLoading(true);

        const selectedStation = stationData.allStations.find(
            (station: Station) => station.number === stationNumber
        );

        const nodeKey = `station_${selectedStation?.number}`;
        const stationNode = nodes ? nodes[nodeKey] : null;

        let targetStation: Station | null = selectedStation || null;

        if (stationNode && selectedStation) {
            targetStation = {
                ...selectedStation,
                position: [
                    stationNode.position.x,
                    stationNode.position.y,
                    stationNode.position.z,
                ] as [number, number, number],
            };
        }

        setActiveStation(targetStation);
        MoveCameraToStation(cameraControlsRef, targetStation, isMobile);

        if (targetStation?.id) {
            setIsLoading(true);
            setError(null);
            setTrainsData?.(null); 

            try {
                const data = await fetchTrainData(targetStation.id);
                setTrainsData?.(data);
            } catch (err) {
                setError("Failed to load train data");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            <h3>{textData.main_panel_title}</h3>

            {isLoading && <p>Loading data...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="station-select">
                {stationData.allStations.map((station: Station) => (
                    <button
                        key={station.id}
                        disabled={isLoading}
                        onClick={() => handleStationChange(station.number)}
                        className={
                            activeStation?.number === station.number
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
