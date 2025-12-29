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
        if (cameraControlsRef.current && activeStation) {
            const { nodes } = useGLTF("/models/042_sporenkijker_7.gltf") as any;
            
            let targetPosition: [number, number, number];
            
            // Convert station ID to match node naming convention (remove dots and spaces)
            const nodeKey = activeStation.id.replace(/\./g, '').replace(/\s/g, '');
            const stationNode = nodes[nodeKey];

            if (stationNode) {
                // Use the position from the Three.js node
                targetPosition = [
                    stationNode.position.x,
                    stationNode.position.y,
                    stationNode.position.z
                ];
            } else {
                // Fallback to default position when station node not found
                targetPosition = [0, 0, 0];
            }

            const cameraPosition: [number, number, number] = [
                targetPosition[0] + 1,
                targetPosition[1] + 0.8,
                targetPosition[2] + 1,
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

            // Add zoom effect
            cameraControlsRef.current.zoomTo(2, true);
        }
    }, [activeStation]);

    const MapMesh = () => {
        const { nodes, materials } = useGLTF(
            "/models/042_sporenkijker_7.gltf"
        ) as any;

        return (
            <group dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.Plane002 as THREE.Mesh).geometry}
                    material={(nodes.Plane002 as THREE.Mesh).material}
                    position={[
                        nodes.Plane002?.position?.x || 0,
                        nodes.Plane002?.position?.y || 0,
                        nodes.Plane002?.position?.z || 0
                    ]}
                />
            </group>
        );
    };

    const StationMarkers = () => {
        const { nodes } = useGLTF("/models/042_sporenkijker_7.gltf") as any;
        
        return (
            <group>
                {testData.testStations.map((station) => {
                    // Convert station ID to match node naming convention
                    const nodeKey = station.id.replace(/\./g, '').replace(/\s/g, '');
                    const stationNode = nodes[nodeKey];
                    
                    if (stationNode) {
                        return (
                            <mesh
                                key={station.id}
                                position={[
                                    stationNode.position.x,
                                    stationNode.position.y,
                                    stationNode.position.z
                                ]}
                                castShadow
                                receiveShadow
                            >
                                <sphereGeometry args={[0.1, 16, 16]} />
                                <meshStandardMaterial 
                                    color={activeStation?.id === station.id ? "#ff6b35" : "#4a90e2"} 
                                />
                            </mesh>
                        );
                    }
                    return null;
                })}
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

            <MapMesh />
            <StationMarkers />

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
