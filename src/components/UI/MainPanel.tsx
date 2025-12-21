"use client";
import { useAppContext } from "@/app/AppContext";
import testData from "@/data/testData.json";
import StationSelect from "./StationSelect";
import DataPanel from "./DataPanel";

const MainPanel = () => {
    const {
        activeStation,
        setActiveStation,
        cameraPosition,
        setCameraPosition,
    } = useAppContext();

    return (
        <aside className="main-panel">
            <h1>Control Panel</h1>
            <StationSelect
                activeStation={activeStation}
                setActiveStation={setActiveStation}
            />
            <DataPanel station={activeStation ?? undefined} />
        </aside>
    );
};

export default MainPanel;
