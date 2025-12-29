import { useAppContext, Station } from "@/app/AppContext";
import testData from "@/data/testData.json";

const StationSelect = () => {
    const { activeStation, setActiveStation } = useAppContext();

    if (!testData || !testData.testStations) {
        return <div>No station data available</div>;
    }

    const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStation = testData.testStations.find(
            (station: Station) => station.id === e.target.value
        );
        setActiveStation(selectedStation || null);
        console.log("Selected Station:", selectedStation);
    };

    return (
        <div>
            <h3>
                Select a station
            </h3>
            <div className="station-select flex flex-col">
            {testData.testStations.map((station: Station) => (
                <button
                    key={station.id}
                    onClick={() => handleStationChange({ target: { value: station.id } } as any)}
                    className={activeStation?.id === station.id ? "active" : "" + "px-4 py-2 mb-2 bg-gray-200 rounded hover:bg-gray-300"}
                >
                    {station.name}
                </button>
            ))}
            </div>
        </div>
    );
};

export default StationSelect;
