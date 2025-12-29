import { useAppContext } from "@/app/AppContext";
import { Station } from "@/app/type";
import testData from "@/data/testData.json";

const StationSelect = () => {
    const { activeStation, setActiveStation, nodes } = useAppContext();

    console.log("StationSelect Nodes:", nodes);

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
            <div className="station-select flex flex-col">
                {testData.testStations.map((station: Station) => (
                    <button
                        key={station.id}
                        onClick={() => handleStationChange(station.number)}
                        className={
                            activeStation?.number === station.number
                                ? "active"
                                : "" +
                                  "px-4 py-2 mb-2 bg-gray-200 rounded hover:bg-gray-300"
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
