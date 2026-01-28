"use client";

import { Canvas } from "@react-three/fiber";
import MainScene from "@/components/Scene/MainScene";

const FallBack = () => <div>Loading...</div>;

const MainApp = () => {
    return (
        <Canvas
            className="main-app"
            fallback={<FallBack />}
            gl={{antialias: true}}
            dpr={[1,1.4]}
            
        >
            <MainScene />
        </Canvas>

    );
};

export default MainApp;
