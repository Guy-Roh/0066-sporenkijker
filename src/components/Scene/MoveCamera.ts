import { CameraControls } from "@react-three/drei";
import { RefObject } from "react";

export const MoveCamera = (cameraControlsRef: RefObject<CameraControls | null>, activeStation: any) => {
    if (cameraControlsRef && cameraControlsRef.current && activeStation) {

        let targetPosition: [number, number, number] = [0, 0, 0];
        if (activeStation.position) {
            targetPosition[0] = activeStation.position[0];
            targetPosition[1] = activeStation.position[1];
            targetPosition[2] = activeStation.position[2];
        }

        const cameraPosition: [number, number, number] = [
            targetPosition[0],
            targetPosition[1] - 12,
            targetPosition[2] + 8
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

        cameraControlsRef.current.zoomTo(2, true); // zoom level 15 with smooth transition


    }
};