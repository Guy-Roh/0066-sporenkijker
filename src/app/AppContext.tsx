"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import * as THREE from "three";

interface AppContextType {
	activeStation: string | null;
	setActiveStation: (station: string | null) => void;
    cameraPosition: [number, number, number];
    setCameraPosition: (position: [number, number, number]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [activeStation, setActiveStation] = useState<string | null>(null);
    const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([10, 10, 10]);
	return (
		<AppContext.Provider
			value={{
				activeStation,
				setActiveStation,
                cameraPosition,
                setCameraPosition
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
