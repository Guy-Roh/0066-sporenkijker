"use client";
import { createContext, useContext, useState, ReactNode, RefObject, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import { Platform, Station, TrainData } from "./type";
interface AppContextType {
    activeStation: Station | null;
    setActiveStation: (station: Station | null) => void;
    cameraPosition: [number, number, number];
    setCameraPosition: (position: [number, number, number]) => void;
    nodes: any;
    setNodes: (nodes: any) => void;
    isMobile: boolean;
    trainsData?: TrainData | null;
    setTrainsData?: (data: TrainData | null) => void;
    currentPlatform: Platform | null;
    setCurrentPlatform: (platform: Platform | null) => void;
    cameraControlsRef: RefObject<CameraControls | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ 
    children,
    isMobile
}: { 
    children: ReactNode,
    isMobile: boolean
}) => {
	const [activeStation, setActiveStation] = useState<Station | null>(null);
    const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([10, 10, 10]);
    const [nodes, setNodes] = useState<any>(null);
    const [trainsData, setTrainsData] = useState<TrainData | null>(null);
    const [currentPlatform, setCurrentPlatform] = useState<Platform | null>(null);
    const cameraControlsRef = useRef<CameraControls>(null);
	return (
		<AppContext.Provider
			value={{
				activeStation,
				setActiveStation,
                cameraPosition,
                setCameraPosition,
                nodes,
                setNodes,
                isMobile,
                trainsData,
                setTrainsData,
                currentPlatform,
                setCurrentPlatform,
                cameraControlsRef
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within AppProvider");
	}
	return context;
};

export default AppContext;
