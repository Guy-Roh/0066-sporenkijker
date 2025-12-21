"use client"

import { Canvas } from '@react-three/fiber'
import { CameraControls } from "@react-three/drei";
import * as THREE from 'three';
import testData from "@/data/testData.json";
import {
    MeshTransmissionMaterial, ContactShadows, useGLTF, Environment
} from '@react-three/drei';
import { useAppContext } from '@/app/AppContext';
import { useEffect, useRef } from 'react';

const FallBack = () => <div>Loading...</div>

const MainApp = () => {
const { cameraPosition } = useAppContext();

    const SphereMesh = ({
        position
    }: { position: [number, number, number] }) => 
    {
        const { nodes }: any = useGLTF('/models/sphere.glb');
        return (
            <mesh
                geometry={nodes.Sphere.geometry}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
            >
                <MeshTransmissionMaterial
                    transmission={1}
                    thickness={2}
                    roughness={0}
                    chromaticAberration={0.1}
                    anisotropy={0.1}
                />
            </mesh>
        )
    }

    return (
        <Canvas
            className='main-app'
            fallback={<FallBack />}
            shadows={{ type: THREE.PCFSoftShadowMap }}
            camera={{
                zoom: 1,
                position: cameraPosition,
            }}
        >
            <ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />
            <CameraControls 
            interactiveArea={{
                y: 0,
                x: 0,
                width: 0,
                height: 0,
            }}
            />
            <Environment preset="city" />
            <directionalLight
                castShadow
                position={[
                    10,
                    10,
                    5
                ]}
                intensity={1}
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
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshTransmissionMaterial
                        transmission={1}
                        thickness={2}
                        roughness={0}
                        chromaticAberration={0.1}
                        anisotropy={0.1}
                    />
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