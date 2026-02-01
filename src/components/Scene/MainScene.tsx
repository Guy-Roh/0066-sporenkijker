"use client";

import { CameraControls, useGLTF, Environment } from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";
import { useEffect } from "react";
import {
    EffectComposer,
    DepthOfField,
    Bloom,
    ToneMapping,
} from "@react-three/postprocessing";
import { filterTrains } from "../Helpers/Trains";
import { Station, TrainData } from "@/app/type";
import MapMesh from "./MapMesh";
import { AgXToneMapping } from "three";
import { ResetCamera } from "../Helpers/Camera";
import { Vector3 } from "three";



const FX = ({ activeStation }: { activeStation: Station | null }) => {
    const { isMobile } = useAppContext();

    return (
        <EffectComposer multisampling={2}>
            <DepthOfField
                target={activeStation?.position || [0, 0, 0]}
                bokehScale={isMobile&&activeStation?.position ?  1 : activeStation?.position ? 2 : 0}
            />
            <Bloom
                luminanceThreshold={0.8}
                mipmapBlur />
            <ToneMapping mode={AgXToneMapping} />
        </EffectComposer>
    );
};

const MainScene = () => {
    const { activeStation, setNodes, trainsData, cameraControlsRef, isMobile, setCameraOffset } =
        useAppContext();
    const { nodes: meshNodes } = useGLTF("/models/042_export_4.gltf");

    const handleCameraChange = () => {
        if (cameraControlsRef.current) {
            const position = new Vector3();
            const target = new Vector3();
            cameraControlsRef.current.getPosition(position);
            cameraControlsRef.current.getTarget(target);
            const offset = position.sub(target);
            setCameraOffset([offset.x, offset.y, offset.z]);
        }
    };

    useEffect(() => {
        ResetCamera(cameraControlsRef, isMobile, true);
    }, []);

    useEffect(() => {
        setNodes(filterTrains(meshNodes, trainsData as TrainData));

    }, [meshNodes, trainsData, setNodes]);

    return (
        <>
            <color attach="background" args={["#1d1d1d"]} />
            <CameraControls
                ref={cameraControlsRef}
                onChange={handleCameraChange}
            />
            <Environment
                files={"/img/hdri/ragen2k.exr"}
                environmentIntensity={.7}
                environmentRotation={[0, -2.44346,0 ]}
                background={false}
            />
            <FX activeStation={activeStation} />
            <MapMesh />

        </>
    );
};

export default MainScene;
