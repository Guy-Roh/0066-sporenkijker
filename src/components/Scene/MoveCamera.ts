import { CameraControls } from "@react-three/drei";
import { RefObject } from "react";

export const MoveCamera = (cameraControlsRef: RefObject<CameraControls | null>, activeStation: any) => {
    if (cameraControlsRef && cameraControlsRef.current && activeStation) {

        let targetPosition: [number, number, number] = [0, 0, 0];
        if (activeStation.position) {
            targetPosition = activeStation.position;
        }

        const cameraPosition: [number, number, number] = [
            targetPosition[0] + 1,
            targetPosition[1] + 0.8,
            targetPosition[2] + 1,
        ];

        cameraControlsRef.current.setLookAt(
            cameraPosition[0],
            cameraPosition[1],
            cameraPosition[2],
            targetPosition[0],
            targetPosition[1],
            targetPosition[2],
            true // for smooth camera transition
        );


    }
};