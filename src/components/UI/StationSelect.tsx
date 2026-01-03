import { useAppContext } from "@/app/AppContext";
import { Station } from "@/app/type";
import testData from "@/data/testData.json";

const StationSelect = () => {
    const { activeStation, setActiveStation, nodes } = useAppContext();

    if (!testData || !testData.testStations) {
        return <div>No station data available</div>;
    }

    const handleStationChange = (stationNumber: string) => {
        const selectedStation = testData.testStations.find(
            (station: Station) => station.number === stationNumber
        );

        const nodeKey = `station_${selectedStation?.number}`;

        const stationNode = nodes ? nodes[nodeKey] : null;

        if (stationNode) {
            setActiveStation({
                ...selectedStation!,
                position: [
                    stationNode.position.x,
                    stationNode.position.y,
                    stationNode.position.z,
                ],
            });
        } else {
            setActiveStation(selectedStation || null);
        }
    };

    return (
        <div>
            <h3>Select a station</h3>
            <div className="station-select">
                {testData.testStations.map((station: Station) => (
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
