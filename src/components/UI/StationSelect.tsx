import { useAppContext } from "@/app/AppContext";
import React from "react";
import testData from "@/data/testData.json";

const StationSelect = ({
    activeStation,
    setActiveStation,
}: {
    activeStation: string | null;
    setActiveStation: (station: string | null) => void;
}) => {
    if (!testData || !testData.testStations) {
        return <div>No station data available</div>;
    }

    return (
        <select
            name="station select"
            id="station-select"
            value={activeStation ?? ""}
            onChange={(e) => setActiveStation(e.target.value || null)}
        >
            {testData.testStations.map((station: any) => (
                <option key={station.id} value={station.name}>
                    {station.name}
                </option>
            ))}
        </select>
    );
};

export default StationSelect;
