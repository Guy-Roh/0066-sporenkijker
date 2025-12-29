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
                <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.Plane003 as THREE.Mesh).geometry}
                    material={(nodes.Plane003 as THREE.Mesh).material}
                    position={[
                        nodes.Plane003?.position?.x || 0,
                        nodes.Plane003?.position?.y || 0,
                        nodes.Plane003?.position?.z || 0,
                    ]}
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
