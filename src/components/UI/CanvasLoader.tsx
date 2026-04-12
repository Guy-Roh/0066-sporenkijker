"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const CanvasLoader = () => {
    const { progress, active } = useProgress();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!active && progress === 100) {
            setVisible(false);
        }
    }, [active, progress]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#202020]">
            <p className="text-white text-sm mb-3 tracking-wide">
                Sporenkijker is aan het laden...
            </p>
            <div className="w-64 h-1 bg-gray-700 rounded overflow-hidden">
                <div
                    className="h-full bg-blue-500 rounded transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-gray-400 text-xs mt-2">{Math.round(progress)}%</p>
        </div>
    );
};

export default CanvasLoader;
