"use client";

import { CameraControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useAppContext } from "@/app/AppContext";
import { useRef, useEffect } from "react";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { MoveCamera, cameraOffset } from "./MoveCamera";

const MainScene = () => {
    const { activeStation, setNodes } = useAppContext();

    const cameraControlsRef = useRef<CameraControls>(null);
    const dofDistance = Math.hypot(
        cameraOffset.x,
        cameraOffset.y,
        cameraOffset.z
    );

    useEffect(() => {
        MoveCamera(cameraControlsRef, activeStation);
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
                <DepthOfField target={activeStation?.position || [0, 0, 0]} bokehScale={3} />
            </EffectComposer>
        );
    };

    return (
        <>
            <color attach="background" args={["#d9d9d9"]} />
            <CameraControls ref={cameraControlsRef} />
            <Environment preset="city" />
            <FX />
            <MapMesh />
        </>
    );
};

export default MainScene;
