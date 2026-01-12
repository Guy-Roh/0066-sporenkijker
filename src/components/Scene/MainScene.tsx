"use client";

import {
    CameraControls,
    useGLTF,
    Environment,
} from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";
import { useEffect } from "react";
import {
    EffectComposer,
    DepthOfField,
    Bloom,
} from "@react-three/postprocessing";
import { MoveCameraToStation, PanCameraToPlatform } from "../Helpers/Camera";
import { filterTrains } from "../Helpers/Trains";
import { TrainData } from "@/app/type";
import MapMesh from "./MapMesh";

const MainScene = () => {
    const { activeStation, setNodes, isMobile, trainsData, cameraControlsRef } =
        useAppContext();
    const { nodes: meshNodes } = useGLTF(
        "/models/042_export.gltf"
    ) as any;

    useEffect(() => {
        setNodes(filterTrains(meshNodes, trainsData as TrainData));
    }, [meshNodes, trainsData]);

    useEffect(() => {
        MoveCameraToStation(cameraControlsRef, null, isMobile);
    }, []);

    const FX = () => {
        return (
            <EffectComposer multisampling={0}>
                <DepthOfField
                    target={activeStation?.position || [0, 0, 0]}
                    bokehScale={activeStation ? 2 : 0}
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
