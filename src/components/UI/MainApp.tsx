"use client"

import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";


const FallBack = () => {
    return <div>Loading...</div>
}


const MainApp = () => {
    return (
        <Canvas
            className='main-app'
            fallback={<FallBack />}
            orthographic
            camera={{ 
                zoom: 100, 
                position: [10, 10, 10] 
            }}
        >
            <Environment
                files="/img/hdri/sky.hdr"
                background
            />
            <OrbitControls />
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
        </Canvas>
    )
}

export default MainApp