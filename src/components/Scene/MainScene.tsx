"use client";

import {
    CameraControls,
    ContactShadows,
    useGLTF,
    Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useAppContext } from "@/app/AppContext";
import { useRef, useEffect } from "react";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { changeCamera } from "./ChangeCamera";

const MainScene = () => {
    const { activeStation, setNodes } = useAppContext();

    const cameraControlsRef = useRef<CameraControls>(null);

    useEffect(() => {
        changeCamera(cameraControlsRef, activeStation);
    }, [activeStation]);

    const MapMesh = () => {
        const { nodes, materials } = useGLTF(
            "/models/042_sporenkijker_10.gltf"
        ) as any;

        useEffect(() => {
            // Store nodes in context for global access
            setNodes(nodes);
        }, [nodes, setNodes]);

        return (
            <group dispose={null}>
                {Object.entries(nodes).map(([name, node]: [string, any]) => {
                    if (node.geometry) {
                        return (
                            <mesh
                                key={name}
                                castShadow
                                receiveShadow
                                geometry={node.geometry}
                                material={node.material || materials.default}
                                position={node.position}
                            />
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


            <MapMesh />

                        <EffectComposer>
                <DepthOfField
                    target={
                        activeStation
                            ? new THREE.Vector3(
                                  activeStation.position ? activeStation.position[0] : 0,
                                  activeStation.position ? activeStation.position[1] : 0,
                                  activeStation.position ? activeStation.position[2] : 0
                              )
                            : new THREE.Vector3(0, 0, 0)
                    }
                    focalLength={1} // Keep this small for now
                    bokehScale={4}
                    height={480}
                />
            </EffectComposer>
        </>
    );
};

export default MainScene;
