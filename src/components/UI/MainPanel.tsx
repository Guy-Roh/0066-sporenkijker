"use client";
import { useAppContext } from "@/app/AppContext";
import testData from "@/data/testData.json";

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
            <div className="camera-panel flex flex-col ">
                <label htmlFor="camera-x">Camera X</label>

                <input
                    type="range"
                    name="Camera X"
                    id="camera-x"
                    min={-100}
                    max={100}
                    value={cameraPosition[0]}
                    onChange={(e) =>
                        setCameraPosition([
                            Number(e.target.value),
                            cameraPosition[1],
                            cameraPosition[2],
                        ])
                    }
                />
                <label htmlFor="camera-y">Camera Y</label>

                <input
                    type="range"
                    name="Camera Y"
                    id="camera-y"
                    min={-100}
                    max={100}
                    value={cameraPosition[1]}
                    onChange={(e) =>
                        setCameraPosition([
                            cameraPosition[0],
                            Number(e.target.value),
                            cameraPosition[2],
                        ])
                    }
                />
                <label htmlFor="camera-z">Camera Z</label>

                <input
                    type="range"
                    name="Camera Z"
                    id="camera-z"
                    min={-100}
                    max={100}
                    value={cameraPosition[2]}
                    onChange={(e) =>
                        setCameraPosition([
                            cameraPosition[0],
                            cameraPosition[1],
                            Number(e.target.value),
                        ])
                    }
                />
            </div>
        </aside>
    );
};

export default MainPanel;
