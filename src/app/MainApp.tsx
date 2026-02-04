"use client";

import { Canvas } from "@react-three/fiber";
import MainScene from "@/components/Scene/MainScene";
import Loading from "@/components/UI/Loading";
import { Stats } from "@react-three/drei";

const WebGPUApp = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    return (
        <Canvas
            shadows
            className="main-app"
            renderer={{ antialias: !isMobile}}
            fallback={<Loading />}
        >
            <MainScene />
            <Stats />
        </Canvas>
    );
}

const MainApp = () => {
    return (
        <WebGPUApp />
    )
};

export default MainApp;
