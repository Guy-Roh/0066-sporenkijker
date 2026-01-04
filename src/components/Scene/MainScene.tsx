"use client";

import { CameraControls, useGLTF, Environment } from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";
import { useRef, useEffect } from "react";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { MoveCamera } from "../Helpers/Camera";
import StationMarkers from "./Markers";

const MainScene = () => {
    const { activeStation, setNodes, isMobile } = useAppContext();
    const cameraControlsRef = useRef<CameraControls>(null);

    useEffect(() => {
        MoveCamera(cameraControlsRef, activeStation, isMobile);
    }, [activeStation]);

    const MapMesh = () => {
        const { nodes, materials } = useGLTF(
            "/models/042_sporenkijker_16.gltf"
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
            <EffectComposer enableNormalPass multisampling={0}>
                <DepthOfField
                    target={activeStation?.position || [0, 0, 0]}
                    bokehScale={activeStation ? 3 : 0}
                />
            </EffectComposer>
        );
    };

    return (
        <>
            <color attach="background" args={["#212121"]} />
            <CameraControls ref={cameraControlsRef} />
            <Environment preset="city" />
            <FX />
            <MapMesh />
            <StationMarkers />
        </>
    );
};

export default MainScene;
