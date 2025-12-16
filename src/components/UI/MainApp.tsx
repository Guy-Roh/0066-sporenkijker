"use client"

import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { OrbitControls } from "@react-three/drei";


const MainApp = () => {
  return (
    <Canvas
    className='main-app'
    >
        MainApp
            <OrbitControls />
            <ambientLight intensity={0.5} />
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    </Canvas>
  )
}

export default MainApp