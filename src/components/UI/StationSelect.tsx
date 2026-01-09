import { useAppContext } from "@/app/AppContext";
import { Station } from "@/app/type";
import textData from "@/data/textData.json";
import { useTrainData } from "../Helpers/GetData";
import { MoveCameraToStation } from "../Helpers/Camera";
import stationData from "@/data/stationData.json";

const StationSelect = () => {
    const { activeStation, setActiveStation, nodes, cameraControlsRef, isMobile } = useAppContext();

    const { trainsData } = useTrainData(activeStation ? activeStation.id : "");
    if (!trainsData || !trainsData.trains) {
        return <div>No station data available</div>;
    }

    const handleStationChange = (stationNumber: string) => {
        const selectedStation = stationData.allStations.find(
            (station: Station) => station.number === stationNumber
        );

        const nodeKey = `station_${selectedStation?.number}`;

        const stationNode = nodes ? nodes[nodeKey] : null;

        if (stationNode) {
            const newStation = {
                ...selectedStation!,
                position: [
                    stationNode.position.x,
                    stationNode.position.y,
                    stationNode.position.z,
                ] as [number, number, number],
            };
            setActiveStation(newStation);
            MoveCameraToStation(cameraControlsRef, newStation, isMobile);
        } else {
            setActiveStation(selectedStation || null);
            MoveCameraToStation(cameraControlsRef, selectedStation || null, isMobile);
        }
    };

    return (
        <div>
            <h3>{textData.main_panel_title}</h3>
            <div className="station-select">
                {stationData.allStations.map((station: Station) => (
                    <button
                        key={station.id}
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
