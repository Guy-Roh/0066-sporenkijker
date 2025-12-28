"use client";

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
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

const MainScene = () => {
    const { activeStation } = useAppContext();

    const cameraControlsRef = useRef<CameraControls>(null);

    useEffect(() => {
        if (cameraControlsRef.current) {
            const targetPosition = activeStation
                ? (activeStation.stationPosition as [number, number, number])
                : ([0, 0, 0] as [number, number, number]);

            const cameraPosition: [number, number, number] = [
                targetPosition[0] + 5,
                targetPosition[1] + 3,
                targetPosition[2] + 5,
            ];

            cameraControlsRef.current.setLookAt(
                cameraPosition[0],
                cameraPosition[1],
                cameraPosition[2],
                targetPosition[0],
                targetPosition[1],
                targetPosition[2],
                true // for smooth camera transition
            );
        }
    }, [activeStation]);

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

    const MapMesh = () => {
        const { nodes, materials } = useGLTF("/models/map.glb");
        return (
            <group dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.Plane003 as THREE.Mesh).geometry}
                    material={(nodes.Plane003 as THREE.Mesh).material}
                    rotation={[Math.PI / 2, 0, 0]}
                />
            </group>
        );
    };

    return (
        <>
            <ContactShadows
                scale={100}
                position={[0, -7.5, 0]}
                blur={1}
                far={100}
                opacity={0.85}
            />

            <CameraControls ref={cameraControlsRef} />
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
            {/*             {testData.testStations.map((station: any) => (
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
            ))} */}
            <MapMesh />

            {/*             <EffectComposer>
                <DepthOfField
                    target={
                        activeStation
                            ? new THREE.Vector3(
                                  activeStation.stationPosition[0],
                                  activeStation.stationPosition[1],
                                  activeStation.stationPosition[2]
                              )
                            : new THREE.Vector3(0, 0, 0)
                    }
                    focalLength={1} // Keep this small for now
                    bokehScale={4}
                    height={480}
                />
            </EffectComposer> */}
        </>
    );
};

export default MainScene;
