"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
	activeStation: string | null;
	setActiveStation: (station: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [activeStation, setActiveStation] = useState<string | null>(null);
	return (
		<AppContext.Provider
			value={{
				activeStation,
				setActiveStation,
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
