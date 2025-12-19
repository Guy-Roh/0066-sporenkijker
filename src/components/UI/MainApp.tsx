"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import testData from "@/data/testData.json";

const FallBack = () => <div>Loading...</div>

const MainApp = () => {
    return (
        <Canvas
            className='main-app'
            fallback={<FallBack />}
            orthographic
            shadows={{ type: THREE.PCFSoftShadowMap }}
            camera={{
                zoom: 100,
                position: [10, 10, 10]
            }}
        >
            <OrbitControls enableRotate={false} />
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1} 
                castShadow
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-mapSize={[1024, 1024]}
            />
            {testData.testStations.map((station: any) => (
                <mesh
                    key={station.id}
                    position={station.stationPosition}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            ))}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="lightgrey" />
            </mesh>
        </Canvas>
    )
}

export default MainApp