"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
export const StageTest = () => {
    return (
        <Canvas shadows className="main-app">
            <Stage intensity={1.5} shadows="accumulative" environment="night">
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="#444444" />
                </mesh>
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={20}
                    castShadow
                />
            </Stage>
            <OrbitControls />
        </Canvas>
    );
};
