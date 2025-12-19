"use client";
import { useAppContext } from "@/app/AppContext";
import testData from "@/data/testData.json";


const MainPanel = () => {
    const { activeStation, setActiveStation} = useAppContext();
    return (
        <aside className="main-panel">
            <h1>Control Panel</h1>
            <select name="station select" id="station-select" value={activeStation ?? ""} onChange={(e) => setActiveStation(e.target.value || null)}>
                {
                    testData.testStations.map((station: any) => (
                        <option key={station.id} value={station.name}>
                            {station.name}
                        </option>
                    ))
                }
            </select>
        </aside>
    );
};

export default MainPanel;
