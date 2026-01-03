"use client";
import StationSelect from "./StationSelect";
import { useState } from "react";

const MainPanel = () => {

    const [isHidden , setIsHidden] = useState(false);

    const handleMinimize = () => {
        setIsHidden(!isHidden);
    }

    const handleMaximize = () => {
        if (!isHidden) return;
        setIsHidden(false);
    }

    return (
        <aside className={`main-panel ${isHidden ? 'minimized' : ''}`}
        onClick={handleMaximize}
        >
            <StationSelect/>
            <button className="minimize-btn" onClick={handleMinimize}>
                {'ↆ'}

            </button>
        </aside>
    );
};

export default MainPanel;
