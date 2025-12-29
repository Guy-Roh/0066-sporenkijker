"use client";

import {
    CameraControls,
    useGLTF,
    Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useAppContext } from "@/app/AppContext";
import { useRef, useEffect } from "react";
import {
    EffectComposer,
    DepthOfField,
    N8AO,
} from "@react-three/postprocessing";
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

    const FX = () => {
        return (
            <EffectComposer enableNormalPass>
                <DepthOfField
                    target={DoF.current}
                    bokehScale={3}
                    height={window.innerHeight}
                    width={window.innerWidth}
                />
                <N8AO
                    aoRadius={10}
                    distanceFalloff={12}
                    intensity={2}
                    screenSpaceRadius={true}
                    denoiseSamples={6}
                />
            </EffectComposer>
        );
    };

    return (
        <>
            <CameraControls ref={cameraControlsRef} />
            <Environment preset="city" />
            <FX />
            <MapMesh />
        </>
    );
};

export default MainScene;
