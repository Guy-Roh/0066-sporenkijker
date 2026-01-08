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
import StationMarkers from "./Markers";
import { filterTrains } from "../Helpers/Trains";
import { TrainData } from "@/app/type";

const MainScene = () => {
    const { activeStation, nodes, setNodes, isMobile, trainsData } =
        useAppContext();
    const cameraControlsRef = useRef<CameraControls>(null);
    const { nodes: meshNodes, materials } = useGLTF(
        "/models/042_sporenkijker_16.gltf"
    ) as any;

    useEffect(() => {
        setNodes(filterTrains(meshNodes, trainsData as TrainData));
    }, [meshNodes, trainsData]);

    useEffect(() => {
        MoveCameraToStation(cameraControlsRef, activeStation, isMobile);
    }, [activeStation]);

    const MapMesh = () => {
        return (
            <group dispose={null}>
                {nodes &&
                    Object.entries(nodes).map(([name, node]: [string, any]) => {
                        if (node.geometry) {
                            const isGlass = node.material?.name === "Glass";

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
            {/*             <StationMarkers />
             */}{" "}
        </>
    );
};

export default MainScene;
