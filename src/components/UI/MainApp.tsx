"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useState } from 'react';

const FallBack = () => {
    return <div>Loading...</div>
}
const CubeHeightSlider = ({ cubeHeight, setCubeHeight }: { cubeHeight: number, setCubeHeight: (height: number) => void }) => {
    return (
        <div className="cube-height-slider">
            <label htmlFor="heightRange">Cube Height: {cubeHeight.toFixed(2)}</label>
            <input
                type="range"
                id="heightRange"
                min="0"
                max="5"
                step="0.1"
                value={cubeHeight}
                onChange={(e) => setCubeHeight(parseFloat(e.target.value))}
            />
        </div>
    )
}

const MainApp = () => {
    const [cubeHeight, setCubeHeight] = useState(1);

    return (
        <>
            <CubeHeightSlider cubeHeight={cubeHeight} setCubeHeight={setCubeHeight} />            <Canvas
                className='main-app'
                fallback={<FallBack />}
                orthographic
                shadows
                camera={{
                    zoom: 100,
                    position: [10, 10, 10]
                }}
            >
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={10}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <mesh
                    position={[0, cubeHeight / 2, 0]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[1, cubeHeight, 1]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="lightgrey" />
                </mesh>
            </Canvas>
        </>
    )
}

export default MainApp