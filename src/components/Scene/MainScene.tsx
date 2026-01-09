"use client";

import {
    CameraControls,
    useGLTF,
    Environment,
    MeshTransmissionMaterial,
} from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";
import { useRef, useEffect } from "react";
import {
    EffectComposer,
    DepthOfField,
    Bloom,
} from "@react-three/postprocessing";
import { MoveCameraToStation, PanCameraToPlatform } from "../Helpers/Camera";
import { filterTrains } from "../Helpers/Trains";
import { TrainData } from "@/app/type";

const MainScene = () => {
    const { activeStation, nodes, setNodes, isMobile, trainsData, currentPlatform, cameraControlsRef } =
        useAppContext();
    const { nodes: meshNodes, materials } = useGLTF(
        "/models/042_sporenkijker_16.gltf"
    ) as any;

    useEffect(() => {
        setNodes(filterTrains(meshNodes, trainsData as TrainData));
    }, [meshNodes, trainsData]);

    useEffect(() => {
        MoveCameraToStation(cameraControlsRef, null, isMobile);
    }, []);

    const MapMesh = () => {
        const getSelectedTrainKey = () => {
            if (!currentPlatform || !activeStation) return null;
            const cleanStationId = activeStation.id.replace(/\./g, "");
            const paddedPlatform = currentPlatform.number.toString().padStart(3, "0");
            return `${cleanStationId}${paddedPlatform}`;
        };

        const selectedTrainKey = getSelectedTrainKey();

        return (
            <group dispose={null}>
                {nodes &&
                    Object.entries(nodes).map(([name, node]: [string, any]) => {
                        if (node.geometry) {
                            const isGlass = node.material?.name === "Glass";
                            const isSelectedTrain = name === selectedTrainKey;

                            return (
                                <mesh
                                    key={name}
                                    castShadow
                                    receiveShadow
                                    geometry={node.geometry}
                                    position={node.position}
                                >
                                    {isGlass ? (
                                        <MeshTransmissionMaterial
                                            transmission={1}
                                            thickness={0.5}
                                            roughness={0.05}
                                            chromaticAberration={0.03}
                                        />
                                    ) : (
                                        <primitive
                                            object={
                                                node.material ||
                                                materials.default
                                            }
                                            attach="material"
                                        />
                                    )}
                                    {isSelectedTrain && (
                                        <meshStandardMaterial
                                            emissive="#1d82ff"
                                            emissiveIntensity={6}
                                        />
                                    )}
                                </mesh>
                            );
                        }
                        return null;
                    })}
            </group>
        );
    };

    const FX = () => {
        return (
            <EffectComposer multisampling={0}>
                <DepthOfField
                    target={activeStation?.position || [0, 0, 0]}
                    bokehScale={activeStation ? 3 : 0}
                />
                <Bloom luminanceThreshold={1} mipmapBlur />
            </EffectComposer>
        );
    };

    return (
        <>
            <color attach="background" args={["#212121"]} />
            <CameraControls ref={cameraControlsRef} />
            <Environment
                files={"/img/hdri/capehill.hdr"}
                background={false}
                backgroundIntensity={0.2}
                backgroundRotation={[0, 0, Math.PI]}
            />
            <FX />
            <MapMesh />
        </>
    );
};

export default MainScene;
