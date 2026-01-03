"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Station } from "./type";
interface AppContextType {
	activeStation: Station | null;
	setActiveStation: (station: Station | null) => void;
    cameraPosition: [number, number, number];
    setCameraPosition: (position: [number, number, number]) => void;
    nodes: any;
    setNodes: (nodes: any) => void;
    isMobile: boolean;
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
	return (
		<AppContext.Provider
			value={{
				activeStation,
				setActiveStation,
                cameraPosition,
                setCameraPosition,
                nodes,
                setNodes,
                isMobile
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
