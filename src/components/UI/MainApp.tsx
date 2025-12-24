"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import MainScene from "@/components/Scene/MainScene";

const FallBack = () => <div>Loading...</div>;

const MainApp = () => {
    return (
        <Canvas
            className="main-app"
            fallback={<FallBack />}
            shadows={{ type: THREE.PCFSoftShadowMap }}
        >
            <MainScene />
        </Canvas>
    );
};

export default MainApp;
