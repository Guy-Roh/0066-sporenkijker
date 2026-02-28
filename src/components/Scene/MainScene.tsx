"use client";

import { CameraControls, useGLTF, Environment } from "@react-three/drei";
import { useAppContext } from "@/app/AppContext";
import { useEffect } from "react";
import { filterTrains } from "../Helpers/Trains";
import { TrainData } from "@/app/type";
import MapMesh from "./MapMesh";
import { ResetCamera } from "../Helpers/Camera";
import { Vector3 } from "three";

const MainScene = () => {
    const { setNodes, trainsData, cameraControlsRef, isMobile, setCameraOffset } =
        useAppContext();
    const { nodes: meshNodes } = useGLTF("/models/042_sporenkijker_export_12.gltf");

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
    }, [cameraControlsRef, isMobile]);

    useEffect(() => {
        setNodes(filterTrains(meshNodes, trainsData as TrainData));

    }, [meshNodes, trainsData, setNodes]);

    return (
        <>
            <CameraControls
                ref={cameraControlsRef}
                onChange={handleCameraChange}
            />
            <Environment
                files={"/img/hdri/ragen2k.exr"}
                environmentIntensity={.7}
                environmentRotation={[0, 2.44346,0 ]}
                background={false}
            />
            <MapMesh />

        </>
    );
};

export default MainScene;
