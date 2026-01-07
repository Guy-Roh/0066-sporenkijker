"use client";

import { CameraControls, useGLTF, Environment } from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";
import { useRef, useEffect } from "react";
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing";
import { MoveCamera } from "../Helpers/Camera";
import StationMarkers from "./Markers";

const MainScene = () => {
    const { activeStation, setNodes, isMobile, trainsData } = useAppContext();
    const cameraControlsRef = useRef<CameraControls>(null);

    useEffect(() => {
        MoveCamera(cameraControlsRef, activeStation, isMobile);
    }, [activeStation]);

    const MapMesh = () => {
        const { nodes: meshNodes, materials } = useGLTF(
            "/models/042_sporenkijker_16.gltf"
        ) as any;

        useEffect(() => {
            setNodes(meshNodes);
        }, [meshNodes, setNodes]);

        const rawStationId = trainsData?.station || "";
        const trains = trainsData?.trains || [];

        const cleanStationId = rawStationId.replace(/\./g, "");

        const validTrainKeys = new Set(
            trains
                .filter((t: any) => t.platform && t.platform !== "?")
                .map((t: any) => {
                    const paddedPlatform = t.platform
                        .toString()
                        .padStart(3, "0");
                    return `${cleanStationId}${paddedPlatform}`;
                })
        ); // this will hold keys like "BENMBS008821006001"

        const filteredEntries = Object.entries(meshNodes).filter(
            ([name, _]: [string, any]) => {
                if (name.startsWith("BENMBS")) {
                    return validTrainKeys.has(name);
                }
                return true;
            }
        ); // this keeps all non-station nodes plus only the active station platforms

        const selectedNodes = Object.fromEntries(filteredEntries);

        return (
            <group dispose={null}>
                {Object.entries(selectedNodes).map(
                    ([name, node]: [string, any]) => {
                        if (node.geometry) {
                            return (
                                <mesh
                                    key={name}
                                    castShadow
                                    receiveShadow
                                    geometry={node.geometry}
                                    material={
                                        node.material || materials.default
                                    }
                                    position={node.position}
                                />
                            );
                        }
                        return null;
                    }
                )}
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
                <Bloom luminanceThreshold={1} mipmapBlur />
            </EffectComposer>
        );
    };

    return (
        <>
            <color attach="background" args={["#212121"]} />
            <CameraControls ref={cameraControlsRef} />
            <Environment
                backgroundIntensity={1}
                preset="night"
/*                 environmentRotation={[-Math.PI / 2, 0, Math.PI / 2]}
 */            />
            <FX />
            <MapMesh />
{/*             <StationMarkers />
 */}        </>
    );
};

export default MainScene;
