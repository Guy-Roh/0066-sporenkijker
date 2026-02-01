"use client";
import StationSelect from "./StationSelect";
import { useState } from "react";
import { useAppContext } from "@/app/AppContext";

const MainPanel = () => {

    const [isHidden , setIsHidden] = useState(false);
    const { cameraOffset } = useAppContext();

    const handleMinimize = () => {
        setIsHidden(!isHidden);
    }

    const handleMaximize = () => {
        if (!isHidden) return;
        setIsHidden(false);
    }

    return (
        <aside className={`main-panel glass ${isHidden ? 'minimized' : ''}`}
        onClick={handleMaximize}
        >
            <StationSelect/>
            {cameraOffset && (
                <div className="camera-offset">
                    Offset: X: {cameraOffset[0].toFixed(2)}, Y: {cameraOffset[1].toFixed(2)}, Z: {cameraOffset[2].toFixed(2)}
                </div>
            )}
            <button className="minimize-btn" onClick={handleMinimize}>
                {'ↆ'}

            </button>
        </aside>
    );
};

export default MainPanel;
