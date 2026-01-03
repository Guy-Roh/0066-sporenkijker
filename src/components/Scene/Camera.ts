import { CameraControls } from "@react-three/drei";
import { RefObject } from "react";



export const MoveCamera = (cameraControlsRef: RefObject<CameraControls | null>, activeStation: any, isMobile: boolean) => {
    let cameraPosOffset = { x: 0, y: -16, z: 8 };
    let cameraPosition: [number, number, number] = [0, 0, 60];
    if (isMobile) {
        cameraPosition = [0, 0, 180];
        cameraPosOffset = { x: 0, y: -10, z: 8 };
    }
    
    if (cameraControlsRef && cameraControlsRef.current && activeStation) {

        let targetPosition: [number, number, number] = [0, 0, 0];
        if (activeStation.position) {
            targetPosition[0] = activeStation.position[0];
            targetPosition[1] = activeStation.position[1];
            targetPosition[2] = activeStation.position[2];
        }

        if (activeStation) {
            cameraPosition = [
                targetPosition[0] + cameraPosOffset.x,
                targetPosition[1] + cameraPosOffset.y,
                targetPosition[2] + cameraPosOffset.z,
            ];
        }

        cameraControlsRef.current.setLookAt(
            cameraPosition[0],
            cameraPosition[1],
            cameraPosition[2],
            targetPosition[0],
            targetPosition[1],
            targetPosition[2],
            true // for smooth camera transition
        );

        cameraControlsRef.current.zoomTo(2, true);
        cameraControlsRef.current.truck(0, 1, true);
    } else {
        if (cameraControlsRef && cameraControlsRef.current) {
            cameraControlsRef.current.setLookAt(
                cameraPosition[0],
                cameraPosition[1],
                cameraPosition[2],
                0,
                0,
                0,
                true
            );
            cameraControlsRef.current.zoomTo(1, true);
        }
    }
};