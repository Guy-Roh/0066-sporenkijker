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
import { MoveCamera } from "./MoveCamera";

const MainScene = () => {
    const { activeStation, setNodes } = useAppContext();

    const cameraControlsRef = useRef<CameraControls>(null);
    let DoFTarget = new THREE.Vector3(0, 0, 0);
    const DoF = useRef(DoFTarget);
    useEffect(() => {
        MoveCamera(cameraControlsRef, activeStation);
        if (activeStation && activeStation.position) {
            DoFTarget.set(
                activeStation.position[0],
                activeStation.position[1],
                activeStation.position[2]
            );
        }
        console.log("DoF Target set to:", DoFTarget);
    }, [activeStation]);

    const MapMesh = () => {
        const { nodes, materials } = useGLTF(
            "/models/042_sporenkijker_10_scaled.gltf"
        ) as any;

        useEffect(() => {
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
                far={1000}
                opacity={0.85}
            />

            <CameraControls ref={cameraControlsRef} />
            <Environment preset="city" />

            <MapMesh />

            <EffectComposer>
                <DepthOfField
                    target={DoF.current}
                    bokehScale={2}
                    height={window.innerHeight}
                    width={window.innerWidth}
                />
            </EffectComposer>
        </>
    );
};

export default MainScene;
