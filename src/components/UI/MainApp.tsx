"use client";

import { Canvas } from "@react-three/fiber";
import {
    CameraControls,
    MeshTransmissionMaterial,
    ContactShadows,
    useGLTF,
    Environment,
} from "@react-three/drei";
import * as THREE from "three";
import testData from "@/data/testData.json";
import { useAppContext } from "@/app/AppContext";
import { useRef, useEffect } from "react";

const FallBack = () => <div>Loading...</div>;

const MainApp = () => {
    const { cameraPosition } = useAppContext();

    const cameraControlsRef = useRef<CameraControls>(null);

    useEffect(() => {
        if (cameraControlsRef.current) {
            cameraControlsRef.current.setPosition(
                cameraPosition[0],
                cameraPosition[1],
                cameraPosition[2],
                true // enableTransition: true (smooth movement)
            );
        }
    }, [cameraPosition]);

    const SphereMesh = ({
        position,
    }: {
        position: [number, number, number];
    }) => {
        const { nodes }: any = useGLTF("/models/sphere.glb");
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
        );
    };

    useEffect(() => {
        console.log("Camera Position Updated:", cameraPosition);
    }, [cameraPosition]);

    return (
        <Canvas
            className="main-app"
            fallback={<FallBack />}
            shadows={{ type: THREE.PCFSoftShadowMap }}
        >
            <ContactShadows
                scale={100}
                position={[0, -7.5, 0]}
                blur={1}
                far={100}
                opacity={0.85}
            />

            <CameraControls
                ref={cameraControlsRef}

            />
            <Environment preset="city" />
            <directionalLight
                castShadow
                position={[10, 10, 5]}
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
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.5, 0]}
                receiveShadow
            >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="lightgrey" />
            </mesh>
        </Canvas>
    );
};

export default MainApp;
