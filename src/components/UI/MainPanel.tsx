"use client";
import { useAppContext } from "@/app/AppContext";
import StationSelect from "./StationSelect";
import DataPanel from "./DataPanel";

const MainPanel = () => {
    const {
        activeStation,
        setActiveStation,
    } = useAppContext();

    return (
        <aside className="main-panel">
            <StationSelect/>
            <DataPanel station={activeStation ?? undefined} />
        </aside>
    );
};

export default MainPanel;
