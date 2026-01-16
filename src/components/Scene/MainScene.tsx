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
        ToneMapping,

} from "@react-three/postprocessing";
import { MoveCameraToStation } from "../Helpers/Camera";
import { filterTrains } from "../Helpers/Trains";
import { Station, TrainData } from "@/app/type";
import MapMesh from "./MapMesh";
import { AgXToneMapping } from "three"; // <--- Import constants
const FX = ({ activeStation }: { activeStation: Station | null }) => {
    return (
        <EffectComposer multisampling={4}>
            <DepthOfField
                target={activeStation?.position || [0, 0, 0]}
                bokehScale={activeStation?.position ? 2 : 0}
            />
            <Bloom luminanceThreshold={.8} mipmapBlur />
            <ToneMapping mode={AgXToneMapping} />
        </EffectComposer>
    );
};

const MainScene = () => {
    const { activeStation, setNodes, isMobile, trainsData, cameraControlsRef } =
        useAppContext();
    const { nodes: meshNodes } = useGLTF("/models/042_export_2.gltf");

    useEffect(() => {
        setNodes(filterTrains(meshNodes, trainsData as TrainData));
    }, [meshNodes, trainsData, setNodes]);

    useEffect(() => {
        MoveCameraToStation(cameraControlsRef, null, isMobile);
    }, [cameraControlsRef, isMobile]);

    return (
        <>
            <color attach="background" args={["#212121"]} />
            <CameraControls ref={cameraControlsRef} />
            <Environment
                files={"/img/hdri/capehill.hdr"}
/*                 preset={"night"} // either this or the hdri works
 */                background={false}
                backgroundIntensity={1}
                backgroundRotation={[0, 0, Math.PI]}
            />
            <FX activeStation={activeStation} />
            <MapMesh />
        </>
    );
};

export default MainScene;
