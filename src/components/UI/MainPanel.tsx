"use client";
import { useAppContext } from "@/app/AppContext";
import StationSelect from "./StationSelect";

const MainPanel = () => {
    const {
        activeStation,
        setActiveStation,
    } = useAppContext();

    return (
        <aside className="main-panel">
            <StationSelect/>
        </aside>
    );
};

export default MainPanel;
